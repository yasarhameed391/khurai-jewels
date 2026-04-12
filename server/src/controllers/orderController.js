const Stripe = require('stripe');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const cartRepository = require('../repositories/CartRepository');
const productRepository = require('../repositories/ProductRepository');
const emailService = require('../services/emailService');
const { catchAsync, AppError, successResponse } = require('../utils/helpers');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpay = process.env.RAZORPAY_KEY_ID ? new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
}) : null;

const getRazorpayKey = catchAsync(async (req, res) => {
  successResponse(res, { key: process.env.RAZORPAY_KEY_ID });
});

const createCheckoutSession = catchAsync(async (req, res) => {
  const { userId, items } = req.body;

  if (!items || items.length === 0) {
    throw AppError('No items in cart', 400);
  }

  const productIds = items.map(item => item.productId);
  const products = await productRepository.findAll({ _id: { $in: productIds } });

  const lineItems = items.map(item => {
    const product = products.find(p => p._id.toString() === item.productId);
    if (!product) {
      throw AppError(`Product not found: ${item.productId}`, 400);
    }
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          description: product.description,
          images: product.image ? [product.image] : []
        },
        unit_amount: Math.round(product.price * 100)
      },
      quantity: item.quantity
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/cancel`,
    metadata: { userId }
  });

  successResponse(res, { url: session.url });
});

const createOrder = catchAsync(async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    throw AppError('Session ID required', 400);
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== 'paid') {
    throw AppError('Payment not completed', 400);
  }

  const userId = session.metadata.userId;
  const cart = await cartRepository.findByUserId(userId);

  if (!cart || cart.items.length === 0) {
    throw AppError('Cart is empty', 400);
  }

  const totalAmount = session.amount_total / 100;

  const order = await Order.create({
    userId,
    products: cart.items,
    totalAmount,
    paymentStatus: 'paid'
  });

  await cartRepository.clearCart(userId);

  if (session.customer_details?.email) {
    await emailService.sendOrderConfirmation(session.customer_details.email, order);
  }

  successResponse(res, order, 201);
});

const createCODOrder = catchAsync(async (req, res) => {
  const { userId, items, shippingAddress, totalAmount } = req.body;

  if (!items || items.length === 0) {
    throw AppError('No items in cart', 400);
  }

  const orderNumber = `KJ-${Date.now()}`;
  
  const order = await Order.create({
    userId,
    orderNumber,
    products: items,
    totalAmount,
    shippingAddress,
    paymentMethod: 'COD',
    paymentStatus: 'pending',
    orderStatus: 'confirmed'
  });

  await cartRepository.clearCart(userId);

  if (shippingAddress?.email) {
    await emailService.sendOrderConfirmation(shippingAddress.email, order);
  }

  successResponse(res, { orderId: order._id, orderNumber: order.orderNumber }, 201);
});

const createOrderDirect = catchAsync(async (req, res) => {
  const { items, total, shippingAddress, isGuest, guestEmail } = req.body;

  if (!items || items.length === 0) {
    throw AppError('No items in cart', 400);
  }

  const orderNumber = `KJ-${Date.now()}`;
  
  const order = await Order.create({
    orderNumber,
    products: items,
    totalAmount: total,
    shippingAddress,
    guestEmail: isGuest ? guestEmail : null,
    paymentMethod: 'direct',
    paymentStatus: 'pending',
    orderStatus: 'confirmed'
  });

  const productNames = items.map(i => i.name).join(', ');
  await emailService.sendOrderNotification({
    orderNumber: order.orderNumber,
    customerName: shippingAddress.name,
    items: productNames,
    total: total,
    email: shippingAddress.email || guestEmail
  });

  successResponse(res, { orderId: order._id, orderNumber: order.orderNumber }, 201);
});

const getUserOrders = catchAsync(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw AppError('User ID required', 400);
  }

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  successResponse(res, orders);
});

const getAllOrders = catchAsync(async (req, res) => {
  const { status, paymentStatus, startDate, endDate, page = 1, limit = 20 } = req.query;

  const query = {};
  if (status) query.orderStatus = status;
  if (paymentStatus) query.paymentStatus = paymentStatus;
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Order.countDocuments(query);

  successResponse(res, { orders, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus, paymentStatus } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    throw AppError('Order not found', 404);
  }

  if (orderStatus) order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  await order.save();

  if (order.shippingAddress?.email || order.guestEmail) {
    const email = order.shippingAddress?.email || order.guestEmail;
    await emailService.sendStatusUpdate(email, order);
  }

  successResponse(res, order);
});

const crypto = require('crypto');

const createRazorpayOrder = catchAsync(async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  if (!amount || amount <= 0) {
    throw AppError('Valid amount required', 400);
  }

  if (!razorpay) {
    throw AppError('Razorpay not configured', 503);
  }

  const options = {
    amount: Math.round(amount * 100),
    currency,
    receipt: `KJ-${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);
  
  successResponse(res, {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  });
});

const verifyRazorpayPayment = catchAsync(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw AppError('Payment verification details missing', 400);
  }

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    throw AppError('Invalid payment signature', 400);
  }

  const { items, total, shippingAddress, isGuest, guestEmail, userId } = orderData;
  
  const orderNumber = `KJ-${Date.now()}`;
  
  const order = await Order.create({
    userId: userId || null,
    orderNumber,
    products: items,
    totalAmount: total,
    shippingAddress,
    guestEmail: isGuest ? guestEmail : null,
    paymentMethod: 'Razorpay',
    paymentStatus: 'paid',
    orderStatus: 'confirmed'
  });

  const productNames = items.map(i => i.name).join(', ');
  await emailService.sendOrderNotification({
    orderNumber: order.orderNumber,
    customerName: shippingAddress.name,
    items: productNames,
    total: total,
    email: shippingAddress.email || guestEmail
  });

  if (shippingAddress?.email || guestEmail) {
    await emailService.sendOrderConfirmation(shippingAddress?.email || guestEmail, order);
  }

  successResponse(res, { orderId: order._id, orderNumber: order.orderNumber }, 201);
});

module.exports = { createCheckoutSession, createOrder, createCODOrder, createOrderDirect, getUserOrders, getAllOrders, updateOrderStatus, getRazorpayKey, createRazorpayOrder, verifyRazorpayPayment };

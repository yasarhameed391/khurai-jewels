const Stripe = require('stripe');
const Order = require('../models/Order');
const cartRepository = require('../repositories/CartRepository');
const productRepository = require('../repositories/ProductRepository');
const emailService = require('../services/emailService');
const { catchAsync, AppError, successResponse } = require('../utils/helpers');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

module.exports = { createCheckoutSession, createOrder, createCODOrder };

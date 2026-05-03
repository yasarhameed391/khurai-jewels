const express = require('express');
const orderController = require('../controllers/orderController');
const protect = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items: { type: array }
 *               total: { type: number }
 *               shippingAddress: { type: object }
 *               isGuest: { type: boolean }
 *               guestEmail: { type: string }
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', orderController.createOrderDirect);

/**
 * @swagger
 * /api/orders/checkout:
 *   post:
 *     summary: Create Stripe checkout session
 *     tags: [Orders]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, items]
 *             properties:
 *               userId: { type: string }
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId: { type: string }
 *                     quantity: { type: number }
 *     responses:
 *       200:
 *         description: Checkout session created
 */
router.post('/checkout', protect, orderController.createCheckoutSession);

/**
 * @swagger
 * /api/orders/success:
 *   post:
 *     summary: Save order after payment success
 *     tags: [Orders]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sessionId]
 *             properties:
 *               sessionId: { type: string }
 *     responses:
 *       201:
 *         description: Order saved
 */
router.post('/success', protect, orderController.createOrder);

/**
 * @swagger
 * /api/orders/cod:
 *   post:
 *     summary: Create COD order
 *     tags: [Orders]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, items, shippingAddress, totalAmount]
 *             properties:
 *               userId: { type: string }
 *               items: { type: array }
 *               shippingAddress: { type: object }
 *               totalAmount: { type: number }
 *     responses:
 *       201:
 *         description: COD order created
 */
router.post('/cod', orderController.createCODOrder);

router.get('/user/:userId', protect, orderController.getUserOrders);
router.get('/admin', protect, orderController.getAllOrders);
router.put('/:orderId/status', protect, orderController.updateOrderStatus);

router.get('/razorpay/key', orderController.getRazorpayKey);
router.post('/razorpay/create-order', orderController.createRazorpayOrder);
router.post('/razorpay/verify', orderController.verifyRazorpayPayment);

module.exports = router;

const express = require('express');
const orderController = require('../controllers/orderController');
const protect = require('../middleware/auth');

const router = express.Router();

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

module.exports = router;

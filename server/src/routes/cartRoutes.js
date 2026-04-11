const express = require('express');
const cartController = require('../controllers/cartController');
const protect = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get cart by user ID
 *     tags: [Cart]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Cart found
 */
router.get('/:userId', protect, cartController.getCart);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, productId]
 *             properties:
 *               userId: { type: string }
 *               productId: { type: string }
 *               quantity: { type: number }
 *     responses:
 *       200:
 *         description: Product added to cart
 */
router.post('/add', protect, cartController.addToCart);

/**
 * @swagger
 * /api/cart/remove:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, productId]
 *             properties:
 *               userId: { type: string }
 *               productId: { type: string }
 *     responses:
 *       200:
 *         description: Product removed
 */
router.delete('/remove', protect, cartController.removeFromCart);

module.exports = router;

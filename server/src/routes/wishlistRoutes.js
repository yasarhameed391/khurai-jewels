const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const protect = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/wishlist/{userId}:
 *   get:
 *     summary: Get wishlist by user ID
 *     tags: [Wishlist]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Wishlist found
 */
router.get('/:userId', protect, wishlistController.getWishlist);

/**
 * @swagger
 * /api/wishlist/add:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
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
 *         description: Product added to wishlist
 */
router.post('/add', protect, wishlistController.addToWishlist);

/**
 * @swagger
 * /api/wishlist/remove:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
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
router.delete('/remove', protect, wishlistController.removeFromWishlist);

module.exports = router;

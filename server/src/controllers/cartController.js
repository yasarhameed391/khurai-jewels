const cartRepository = require('../repositories/CartRepository');
const { catchAsync, AppError, successResponse } = require('../utils/helpers');

const getCart = catchAsync(async (req, res) => {
  let cart = await cartRepository.findByUserId(req.params.userId);
  if (!cart) {
    cart = { userId: req.params.userId, items: [] };
  }
  successResponse(res, cart);
});

const addToCart = catchAsync(async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;
  const cart = await cartRepository.addItem(userId, productId, quantity);
  successResponse(res, cart);
});

const removeFromCart = catchAsync(async (req, res) => {
  const { userId, productId } = req.body;
  const cart = await cartRepository.removeItem(userId, productId);
  if (!cart) {
    throw AppError('Cart not found', 404);
  }
  successResponse(res, cart);
});

module.exports = { getCart, addToCart, removeFromCart };

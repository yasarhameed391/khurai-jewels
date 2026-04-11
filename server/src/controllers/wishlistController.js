const wishlistRepository = require('../repositories/WishlistRepository');
const { catchAsync, AppError, successResponse } = require('../utils/helpers');

const getWishlist = catchAsync(async (req, res) => {
  let wishlist = await wishlistRepository.findByUserId(req.params.userId);
  if (!wishlist) {
    wishlist = { userId: req.params.userId, products: [] };
  }
  successResponse(res, wishlist);
});

const addToWishlist = catchAsync(async (req, res) => {
  const { userId, productId } = req.body;
  const wishlist = await wishlistRepository.addProduct(userId, productId);
  successResponse(res, wishlist);
});

const removeFromWishlist = catchAsync(async (req, res) => {
  const { userId, productId } = req.body;
  const wishlist = await wishlistRepository.removeProduct(userId, productId);
  if (!wishlist) {
    throw AppError('Wishlist not found', 404);
  }
  successResponse(res, wishlist);
});

module.exports = { getWishlist, addToWishlist, removeFromWishlist };

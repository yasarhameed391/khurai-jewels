const BaseRepository = require('./BaseRepository');
const Wishlist = require('../models/Wishlist');

class WishlistRepository extends BaseRepository {
  constructor() {
    super(Wishlist);
  }

  async findByUserId(userId) {
    return this.model.findOne({ userId }).populate('products');
  }

  async addProduct(userId, productId) {
    let wishlist = await this.findByUserId(userId);

    if (!wishlist) {
      wishlist = await this.create({ userId, products: [productId] });
    } else {
      const exists = wishlist.products.some(p => p.toString() === productId);
      if (!exists) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    return wishlist.populate('products');
  }

  async removeProduct(userId, productId) {
    const wishlist = await this.findByUserId(userId);
    if (!wishlist) return null;

    wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
    await wishlist.save();
    return wishlist.populate('products');
  }
}

module.exports = new WishlistRepository();

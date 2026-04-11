const BaseRepository = require('./BaseRepository');
const Cart = require('../models/Cart');

class CartRepository extends BaseRepository {
  constructor() {
    super(Cart);
  }

  async findByUserId(userId) {
    return this.model.findOne({ userId }).populate('items.productId');
  }

  async addItem(userId, productId, quantity = 1) {
    let cart = await this.findByUserId(userId);

    if (!cart) {
      cart = await this.create({ userId, items: [{ productId, quantity }] });
    } else {
      const existingItem = cart.items.find(
        item => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    return cart.populate('items.productId');
  }

  async removeItem(userId, productId) {
    const cart = await this.findByUserId(userId);
    if (!cart) return null;

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    return cart.populate('items.productId');
  }

  async clearCart(userId) {
    const cart = await this.findByUserId(userId);
    if (!cart) return null;

    cart.items = [];
    return cart.save();
  }
}

module.exports = new CartRepository();

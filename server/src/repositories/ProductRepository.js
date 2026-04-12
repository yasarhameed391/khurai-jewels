const BaseRepository = require('./BaseRepository');
const Product = require('../models/Product');

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async findByCategory(category) {
    return this.model.find({ category });
  }

  async searchByName(name) {
    return this.model.find({ name: { $regex: name, $options: 'i' } });
  }

  async findBySlug(slug) {
    return this.model.findOne({ slug });
  }
}

module.exports = new ProductRepository();

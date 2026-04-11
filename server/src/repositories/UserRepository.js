const BaseRepository = require('./BaseRepository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.model.findOne({ email: email.toLowerCase() });
  }

  async findByIdWithPassword(id) {
    return this.model.findById(id).select('+password');
  }
}

module.exports = new UserRepository();

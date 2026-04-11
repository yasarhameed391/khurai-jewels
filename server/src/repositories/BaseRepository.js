const mongoose = require('mongoose');

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(query = {}) {
    return this.model.find(query);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findOne(query) {
    return this.model.findOne(query);
  }

  async create(data) {
    const document = new this.model(data);
    return document.save();
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async findByIdAndPopulate(id, populateFields) {
    return this.model.findById(id).populate(populateFields);
  }

  async findOneAndPopulate(query, populateFields) {
    return this.model.findOne(query).populate(populateFields);
  }
}

module.exports = BaseRepository;

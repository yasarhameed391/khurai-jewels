const productRepository = require('../repositories/ProductRepository');
const { catchAsync, AppError, successResponse } = require('../utils/helpers');
const { sendProductNotification } = require('../services/emailService');
const fs = require('fs');
const path = require('path');

const getAll = catchAsync(async (req, res) => {
  const products = await productRepository.findAll();
  successResponse(res, products);
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const mongoose = require('mongoose');
  
  let product;
  
  if (mongoose.Types.ObjectId.isValid(id) && !id.includes('-')) {
    product = await productRepository.findById(id);
  }
  
  if (!product) {
    product = await productRepository.findBySlug(id);
  }
  
  if (!product) {
    throw AppError('Product not found', 404);
  }
  successResponse(res, product);
});

const create = catchAsync(async (req, res) => {
  const productData = { ...req.body };
  
  if (req.file) {
    productData.image = `/uploads/productDetails/${req.file.filename}`;
  }
  
  const product = await productRepository.create(productData);
  
  sendProductNotification('created', product);
  
  successResponse(res, product, 201);
});

const update = catchAsync(async (req, res) => {
  const productData = { ...req.body };
  const previousProduct = await productRepository.findById(req.params.id);
  
  if (!previousProduct) {
    throw AppError('Product not found', 404);
  }
  
  if (req.file) {
    if (previousProduct && previousProduct.image) {
      const oldImagePath = path.join(__dirname, '../../', previousProduct.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    productData.image = `/uploads/productDetails/${req.file.filename}`;
  }
  
  const product = await productRepository.update(req.params.id, productData);
  if (!product) {
    throw AppError('Product not found', 404);
  }
  
  sendProductNotification('updated', product, previousProduct);
  
  successResponse(res, product);
});

const remove = catchAsync(async (req, res) => {
  const existingProduct = await productRepository.findById(req.params.id);
  if (existingProduct && existingProduct.image) {
    const imagePath = path.join(__dirname, '../../', existingProduct.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
  
  const product = await productRepository.delete(req.params.id);
  if (!product) {
    throw AppError('Product not found', 404);
  }
  
  sendProductNotification('deleted', product, existingProduct);
  
  successResponse(res, { message: 'Product deleted successfully' });
});

module.exports = { getAll, getById, create, update, remove };

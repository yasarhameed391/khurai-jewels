const productRepository = require('../repositories/ProductRepository');
const { catchAsync, AppError, successResponse } = require('../utils/helpers');

const getAll = catchAsync(async (req, res) => {
  const products = await productRepository.findAll();
  successResponse(res, products);
});

const getById = catchAsync(async (req, res) => {
  const product = await productRepository.findById(req.params.id);
  if (!product) {
    throw AppError('Product not found', 404);
  }
  successResponse(res, product);
});

const create = catchAsync(async (req, res) => {
  const product = await productRepository.create(req.body);
  successResponse(res, product, 201);
});

const update = catchAsync(async (req, res) => {
  const product = await productRepository.update(req.params.id, req.body);
  if (!product) {
    throw AppError('Product not found', 404);
  }
  successResponse(res, product);
});

const remove = catchAsync(async (req, res) => {
  const product = await productRepository.delete(req.params.id);
  if (!product) {
    throw AppError('Product not found', 404);
  }
  successResponse(res, { message: 'Product deleted successfully' });
});

module.exports = { getAll, getById, create, update, remove };

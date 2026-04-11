const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const AppError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const generateToken = (userId) => {
  const jwt = require('jsonwebtoken');
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const successResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json(data);
};

const errorResponse = (res, message, statusCode = 500) => {
  res.status(statusCode).json({ status: 'error', statusCode, message });
};

const notFoundResponse = (res) => {
  errorResponse(res, 'Resource not found', 404);
};

const validationError = (res, message) => {
  errorResponse(res, message, 400);
};

module.exports = {
  catchAsync,
  AppError,
  generateToken,
  successResponse,
  errorResponse,
  notFoundResponse,
  validationError
};

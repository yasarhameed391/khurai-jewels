const userRepository = require('../repositories/UserRepository');
const { catchAsync, AppError, generateToken, successResponse, validationError } = require('../utils/helpers');

const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw AppError('Name, email, and password are required', 400);
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw AppError('Email already registered', 400);
  }

  const user = await userRepository.create({ name, email, password });
  const token = generateToken(user._id);

  successResponse(res, {
    user: { id: user._id, name: user.name, email: user.email },
    token
  }, 201);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw AppError('Email and password are required', 400);
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw AppError('Invalid credentials', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw AppError('Invalid credentials', 401);
  }

  const token = generateToken(user._id);

  successResponse(res, {
    user: { id: user._id, name: user.name, email: user.email },
    token
  });
});

module.exports = { register, login };

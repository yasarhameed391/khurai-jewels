const userRepository = require('../repositories/UserRepository');
const { catchAsync, AppError, generateToken, successResponse } = require('../utils/helpers');

const register = catchAsync(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email) {
    throw AppError('Name and email are required', 400);
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw AppError('Email already registered', 400);
  }

  const user = await userRepository.create({ 
    name, 
    email, 
    password, 
    phone,
    address,
    role: 'customer',
    isGuest: false
  });
  const token = generateToken(user._id);

  successResponse(res, {
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role
    },
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
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role
    },
    token
  });
});

const adminLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw AppError('Email and password are required', 400);
  }

  const user = await userRepository.findByEmail(email);
  if (!user || user.role !== 'admin') {
    throw AppError('Invalid admin credentials', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw AppError('Invalid admin credentials', 401);
  }

  const token = generateToken(user._id);

  successResponse(res, {
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email,
      role: user.role
    },
    token
  });
});

const getProfile = catchAsync(async (req, res) => {
  const user = await userRepository.findById(req.user.id);
  if (!user) {
    throw AppError('User not found', 404);
  }

  successResponse(res, {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { name, phone, address } = req.body;
  
  const updateData = {};
  if (name) updateData.name = name;
  if (phone) updateData.phone = phone;
  if (address) updateData.address = address;

  const user = await userRepository.update(req.user.id, updateData);
  if (!user) {
    throw AppError('User not found', 404);
  }

  successResponse(res, {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role
  });
});

module.exports = { register, login, adminLogin, getProfile, updateProfile };
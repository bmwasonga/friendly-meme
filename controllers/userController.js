const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { user } = require('../models');

const registerUser = asyncHandler(async (req, res) => {
  const { phone, password, role } = req.body;

  if (!role || !phone || !password) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide all required fields',
    });
  }

  //check to see if user exists
  const userExists = await user.findOne({ where: { phone } });

  if (userExists) {
    return res.status(400).json({
      status: 400,
      message: 'User already exists',
    });
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await user.create({
    role,
    phone,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      // newUser,
      uuid: newUser.uuid,
      role: newUser.role,
      token: generateToken(newUser.uuid, newUser.role),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide all required fields',
    });
  }

  //check to see if user exists
  const userExists = await user.findOne({ where: { phone } });

  if (!userExists) {
    return res.status(400).json({
      status: 400,
      message: 'User does not exist',
    });
  }

  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    res.status(200).json({
      uuid: userExists.uuid,
      role: userExists.role,
      token: generateToken(userExists.uuid, userExists.role),
    });
  } else {
    res.status(400).json({
      status: 400,
      message: 'Invalid credentials',
    });
  }
});

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
};

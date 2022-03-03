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
  const userExists = await User.findOne({ phone });

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
      id: newUser.UUID,
      role: newUser.role,
      token: generateToken(newUser.UUID, newUser.role),

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
  const userExists = await user.findOne(phone);

  if (!userExists) {
    return res.status(400).json({
      status: 400,
      message: 'User does not exist',
    });
  }

  //check password
  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch) {
    return res.status(400).json({
      status: 400,
      message: 'Incorrect password',
    });
  }

  //create token
  const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  return res.status(200).json({
    status: 200,
    message: 'User logged in successfully',
    data: {
      token,
      user: {
        id: userExists.id,
        role: userExists.role,
        phone: userExists.phone,
      },
    },
  });
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

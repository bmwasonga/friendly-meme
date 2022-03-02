const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { user } = require('../models/user');

const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide all required fields',
    });
  }

  //check to see if user exists
  const userExists = await user.findOne({ phone });

  if (userExists) {
    return res.status(400).json({
      status: 400,
      message: 'User already exists',
    });
  }

  //hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create a new user

  const newUser = await user.create({
    name,
    phone,
    password: hashedPassword,
  });

  //create token
  if (newUser) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      // find out what else is to be in this return that has the token
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
        },
      },
    });
  } else {
    return res.status(400).json({
      status: 400,
      message: 'User not created',
    });
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
  const userExists = await user.findOne({ phone });

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
        name: userExists.name,
        phone: userExists.phone,
      },
    },
  });
});

//cleaner to generate token here and return it for reuse in teh response data

module.exports = {
  registerUser,
  loginUser,
};

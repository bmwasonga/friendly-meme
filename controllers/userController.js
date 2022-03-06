const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { User } = require('../models');

const registerUser = asyncHandler(async (req, res) => {
	const { name, phone, password } = req.body;

	if (!name || !phone || !password) {
		return res.status(400).json({
			status: 400,
			message: 'Please provide all required fields',
		});
	}

	//check to see if user exists
	const userExists = await User.findOne({ where: { phone } });

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

	const newUser = await User.create({
		name,
		phone,
		password: hashedPassword,
	});

	//create token
	if (newUser) {
		const token = jwt.sign(
			{ id: newUser.id, role: newUser.role },
			process.env.JWT_SECRET,
			{
				expiresIn: '24h',
			}
		);
		return res.status(201).json({
			status: 201,
			message: 'User created successfully',
			// find out what else is to be in this return that has the token
			data: {
				token,
				user: {
					id: newUser.id,
					name: newUser.name,
					phone: newUser.phone,
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

//login user
const loginUser = asyncHandler(async (req, res) => {
	//create token
	const token = jwt.sign(
		{ id: req.user.id, role: req.user.role },
		process.env.JWT_SECRET,
		{
			expiresIn: '24h',
		}
	);

	return res.status(200).json({
		status: 200,
		message: 'User logged in successfully',
		data: {
			token,
		},
	});
});

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.findAll();

	return res.status(200).json({
		status: 200,
		message: 'Users retrieved successfully',
		data: users,
	});
});

//cleaner to generate token here and return it for reuse in teh response data

module.exports = {
	registerUser,
	loginUser,
	getAllUsers,
};

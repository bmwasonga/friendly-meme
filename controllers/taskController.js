const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { Task, User } = require('../models');

//fetch all tasks

const fetchAllTasks = asyncHandler(async (req, res, next) => {
	// const { page, size, description } = req.query;
	// var condition = description
	// 	? { description: { [Task.description]: `%${description}%` } }
	// 	: null;
	// const { limit, offset } = getPagination(page, size);

	// const users = await Task.findAndCountAll({
	// 	where: condition,
	// 	offset,
	// 	limit,
	// }).then((tasks) => {
	// 	const response = getPagingData(tasks, page, size);
	// 	res.send(response);
	// });

	const tasks = await User.findAll({
		include: [
			{
				model: User,
				as: 'User',
				attributes: ['id', 'name', 'email', 'phone'],
			},
		],
		where: {
			userId: 3,
		},
	});
	res.send(tasks);
});

//Mazmatic for pagination
const getPagination = (page, size) => {
	const limit = size ? +size : 10;
	const offset = page ? page * limit : 0;
	return { limit, offset };
};

const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: users } = data;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);
	return { totalItems, users, totalPages, currentPage };
};

module.exports = fetchAllTasks;

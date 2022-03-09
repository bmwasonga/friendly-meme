const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { Task, User } = require('../models');

//fetch all tasks

const fetchAllTasks = asyncHandler(async (req, res, next) => {
	const { page, size, title } = req.query;
	const { limit, offset } = getPagination(page, size);

	const tasks = await Task.findAndCountAll({
		offset,
		limit,
	})
		.then((tasks) => {
			const response = getPagingData(tasks, page, limit);
			res.send(response);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data',
			});
		});
});

//Mazmatic for pagination
const getPagination = (page, size) => {
	const limit = size ? +size : 10;
	const offset = page ? page * limit : 0;
	return { limit, offset };
};

const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: tasks } = data;
	const currentPage = page ? +page : 1;
	const totalPages = Math.ceil(totalItems / limit);
	return { totalItems, tasks, totalPages, currentPage };
};

module.exports = fetchAllTasks;

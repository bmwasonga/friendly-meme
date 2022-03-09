import axios from 'axios';
const API_URL = '/api/tasks/';

//get all tasks
const getUsers = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_URL, config);
	return response.data;
};

const taskService = {
	getUsers,
};

export default taskService;

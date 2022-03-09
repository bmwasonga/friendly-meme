import axios from 'axios';
const API_URL = '/api/tasks';

//get all tasks
const getAllTasks = async () => {
	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// };
	const response = await axios.get(API_URL);

	return response.data;
};

const taskService = {
	getAllTasks,
};

export default taskService;

const faker = require('faker');
const tasks = [...Array(100)].map((task) => ({
	client_name: faker.name.firstName(),
	client_lastName: faker.name.lastName(),
	client_phone: faker.phone.phoneNumber(),
	completed: faker.datatype.boolean(),
	task_id: faker.datatype.number(),
	user_id: faker.datatype.number({ min: 1, max: 10 }),
	date_assigned: faker.date.past(),
	date_completed: faker.date.past(),
	date_created: faker.date.past(),
	in_progress: faker.datatype.boolean(),
	task_description: faker.lorem.sentence(),
	paid: faker.datatype.boolean(),
	comment: faker.lorem.sentence(),
	location: faker.address.streetAddress(),
}));
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Task', tasks, {});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Task', null, {});
	},
};

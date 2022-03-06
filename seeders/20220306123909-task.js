const faker = require('faker');
const tasks = [...Array(100)].map((user) => ({
	clientName: faker.name.firstName(),
	clientPhone: faker.phone.phoneNumber('0701#####'),
	completed: faker.datatype.boolean(),
	userId: faker.datatype.number({ min: 1, max: 15 }),
	inProgress: faker.datatype.boolean(),
	taskDescription: faker.lorem.sentence(),
	comment: faker.lorem.sentence(),
	location: faker.address.city(),
	dateAssigned: faker.date.past(),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Tasks', tasks, {});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Tasks', null, {});
	},
};

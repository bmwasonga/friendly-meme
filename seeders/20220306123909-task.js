const faker = require('faker');
const tasks = [...Array(1)].map((user) => ({
	clientName: faker.name.firstName(),
	clientPhone: faker.phone.phoneNumber('0701#####'),
	completed: faker.datatype.boolean(),
	userId: 2912,
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

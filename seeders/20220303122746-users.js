const faker = require('faker');
const users = [...Array(100)].map((user) => ({
  name: faker.name.firstName(),
  phone: faker.phone.phoneNumber('0701#####'),
  role: faker.random.arrayElement(['admin', 'user']),
  password: faker.internet.password(4),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};

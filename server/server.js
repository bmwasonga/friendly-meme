const { sequelize } = require('../models');

const main = async () => {
  // await sequelize.sync({ force: true });
  await sequelize.sync();
  console.log('Database synced');
  process.exit();
};

main();

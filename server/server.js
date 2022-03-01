const express = require('express');
const { sequelize, user } = require('../models');

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  const { phone, password, role } = req.body;

  try {
    const unser = await user.create({ phone, password, role });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: { error } });
  }
});

const main = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced');
  process.exit();
};

main();

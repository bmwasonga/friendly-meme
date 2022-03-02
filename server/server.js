const express = require('express');
const bcrypt = require('bcrypt');

const { sequelize, user } = require('../models');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dash', (req, res) => {
  res.render('dashboard', { user: 'Wasonga' });
});

app.post('/users', async (req, res) => {
  const { phone, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await user.create({
      phone,
      password: hashedPassword,
      role,
    });
    return res.json(response);
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: { error } });
    res.redirect('/register');
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Server is running on port:', PORT, 'and is synced');
  } catch (error) {
    console.log(error);
  }
});

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const { sequelize, user } = require('../models');
const PORT = process.env.PORT || 5000;

const initializePassport = require('../passport.config');

initializePassport(
  passport,
  (phone) => user.findOne({ where: { phone } }),
  (id) => user.findById(id)
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post(
  'login',
  passport.authenticate('local', {
    successRedirect: '/dash',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

app.post('/register', async (req, res) => {
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

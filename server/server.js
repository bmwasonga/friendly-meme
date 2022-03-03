const express = require('express');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const { sequelize } = require('../models');
const PORT = process.env.PORT || 5000;

//include the err middleware

const corsOPtions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const initializePassport = require('../passport.config');

const app = express();
app.use(cors(corsOPtions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.set('view engine', 'ejs');
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

app.use('/api/users', require('../routes/userRoute'));

app.listen(PORT, async () => {
  // await sequelize.sync({ force: true });
  await sequelize.authenticate();
  console.log('Server is running on port:', PORT, 'and is synced');
});

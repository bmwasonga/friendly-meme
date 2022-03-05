const express = require('express');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const { sequelize } = require('../models');
const PORT = process.env.PORT || 5000;
require('../passport/passport.config');

//include the err middleware

const corsOPtions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const app = express();
app.use(cors(corsOPtions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.post(
  'login',
  passport.authenticate('local', {
    successRedirect: '/dash',
    failureRedirect: '/login',
    failureFlash: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: new SequelizeStore({
      db: sequelize,
      table: 'Session',
    }),
  })
);
//route to handle anythign that comes to the user routes
app.use('/api/users', require('../routes/userRoute'));

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);

  next();
});

app.listen(PORT, async () => {
  // await sequelize.sync({ force: true });
  await sequelize.authenticate();
  console.log('Server is running on port:', PORT, 'and is synced');
});

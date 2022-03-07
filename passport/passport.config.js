const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

const customFields = {
	usernameField: 'phone',
	passwordField: 'password',
};

const verifyCallback = (phone, password, done) => {
	User.findOne({ where: { phone } })
		.then((user) => {
			if (!user) {
				return done(null, false, {
					message: 'Incorrect phone number',
				});
			}
			//validate password
			const isValid = bcrypt.compare(password, user.password);

			if (!isValid) {
				return done(null, false, {
					message: 'Incorrect password',
				});
			}

			return done(null, user, {
				message: 'Logged in successfully',
			});
		})
		.catch((err) => {
			return done(err);
		});
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
	done(null, user.phone);
});

passport.deserializeUser((phone, done) => {
	User.findByPk(phone)
		.then((user) => {
			done(null, user);
		})
		.catch((err) => {
			done(err);
		});
});

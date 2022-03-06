const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

const customFields = {
	usernameField: 'phone',
	// if this does not work, add password feild here
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
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findByPk(id)
		.then((user) => {
			done(null, user);
		})
		.catch((err) => {
			done(err);
		});
});

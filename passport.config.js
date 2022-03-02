const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByPhone, getUserById) {
  const authenticateUser = async (phone, password, done) => {
    const user = getUserByPhone(phone);
    if (user == null) {
      return done(null, false, { message: 'No user with that phone number' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new localStrategy({ usernameField: 'phone' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    // User.findById(id, (err, user) => done(err, user));

    return done(null, getUserById(id));
  });
}

module.exports = initialize;

const { Strategy } = require('passport-local');
const { comparePassword } = require('../../auth/pass-hash');
const boom = require('@hapi/boom');

const UserServices = require('../../../services/user.service');
const Service = new UserServices();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await Service.findByEmail(username);
      if (!user) done(boom.unauthorized(), false);

      const isValid = await comparePassword(password, user.password);
      if (!isValid) done(boom.unauthorized(), false);

      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { LocalStrategy };

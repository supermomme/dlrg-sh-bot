'use strict';

const users = require('./users/users.service.js');

const status = require('./status/status.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(status);
};

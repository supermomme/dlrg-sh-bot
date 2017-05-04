'use strict';

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters, `notFound` and
  // the error handler have to go last.
  const app = this;

  app.use(function(err, req, res, next) {
    if(err) console.error(err.stack);
    next(err, req, res);
  });

  app.use(notFound());
  app.use(handler());


};

'use strict'
const Telegraf = require('telegraf');
const webhook = require('./webhook.js');

const commandStatus = require('./commands/status.js');
const commandBenachrichtigung = require('./commands/benachrichtigung.js');

const middlewareAuthentication = require('./middlewares/authentication.js');
const middlewareHelpMessage = require('./middlewares/helpMessage.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.telegraf = new Telegraf(app.get('bot-token'))

  app.telegraf.telegram.setWebhook(`${app.get('app-url')}${app.get('bot-webhook')}`)
  app.telegraf.startWebhook(`${app.get('app-url')}${app.get('bot-webhook')}`, null, 5000)
  app.use(app.telegraf.webhookCallback(app.get('bot-webhook')))

  app.configure(middlewareAuthentication)//always has to be first
  app.configure(webhook);
  app.configure(commandStatus);
  app.configure(commandBenachrichtigung);
  app.configure(middlewareHelpMessage)//always has to be last
  //app.telegraf.startPolling();
};

'use strict';

// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    firstname: { type: String },
    lastname: { type: String },
    telegramId: { type: Number, unique: true },
    jiraKey: { type: String, unique: true },
    nothification: { type: Boolean, default: true },

    status:{ type: mongooseClient.Schema.Types.ObjectId, ref: 'status' },


    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('users', users);
};

"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let deepPopulate = require('mongoose-deep-populate')(mongoose);


let sessionMessageSchema = new Schema({
  sessionChatId: { type: String, ref: 'SessionChat' },
  timestamp: { type: Date, default: Date.now },
  user: {type: String, ref: 'User' },
  name: String,
  img: String,
  content: String,
  messageId: ObjectId
})

sessionMessageSchema.plugin(deepPopulate);

module.exports = mongoose.model('SessionMessage', sessionMessageSchema)

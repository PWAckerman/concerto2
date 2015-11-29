"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let sessionMessageSchema = new Schema({
  sessionId: String,
  timestamp: { type: Date, default: Date.now},
  user: String,
  content: String,
  messageId: ObjectId
})

module.exports = mongoose.model('SessionMessage', sessionMessageSchema)

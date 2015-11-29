"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let groupMessageSchema = new Schema({
  groupChatId: String,
  timestamp: { type: Date, default: Date.now},
  content: String,
  user: String,
  messageId: ObjectId
})

module.exports = mongoose.model('GroupMessage', groupMessageSchema)

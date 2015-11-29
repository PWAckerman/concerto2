"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let sessionChatSchema = new Schema({
  sessionChatId: ObjectId,
  sessionId: String,
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('SessionChat', sessionChatSchema)

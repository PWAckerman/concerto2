"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let groupChatSchema = new Schema({
  chatId: ObjectId,
  created: { type: Date, default: Date.now},
  groupId: String
})

module.exports = mongoose.model('GroupChat', groupChatSchema)

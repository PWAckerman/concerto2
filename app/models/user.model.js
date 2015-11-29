"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let userSchema = new Schema({
  name: String,
  created: { type: Date, default: Date.now},
  modified: Date,
  status: String,
  internalID: String,
  usertype: String,
  UID: ObjectId
})

module.exports = mongoose.model('User', userSchema);

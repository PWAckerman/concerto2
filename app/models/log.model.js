"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let logSchema = new Schema({
  status: String,
  timestamp: {type: Date, default: Date.now},
  content: Object,
  logId: ObjectId
})

module.exports = mongoose.model('Log', logSchema)

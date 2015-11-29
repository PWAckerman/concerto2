"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let sessionSchema = new Schema({
  sectionId: String,
  sessionDate: { type: Date, default: Date.now},
  sessionNumber: String,
  sessionId: ObjectId
})

module.exports = mongoose.model('Session', sessionSchema)

"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let instructorUserSchema = new Schema({
  instructorId: ObjectId,
  courses: [],
  UID: String
})

module.exports = mongoose.model('instructorUser', instructorUserSchema)
"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let gradeSchema = new Schema({
  created: { type: Date, default: Date.now},
  studentId: String,
  value: String,
  assignmentId: String,
  gradeId: ObjectId
})

module.exports = mongoose.model('Grade', gradeSchema)

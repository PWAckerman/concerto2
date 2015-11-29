"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let gradeRecordSchema = new Schema({
  created: { type: Date, default: Date.now},
  courseId: String,
  sectionId: String,
  studentId: String,
  grades: [],
  recordId: ObjectId
})

module.exports = mongoose.model('GradeRecord', gradeRecordSchema)

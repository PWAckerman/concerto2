"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let sectionSchema = new Schema({
  courseId: String,
  created: { type: Date, default: Date.now},
  startDate: { type: Date, default: Date.now},
  endDate: { type: Date, default: Date.now},
  frequency: String,
  scheduleDays: [],
  scheduleTime: String,
  students: [],
  instructor: String,
  sectionNumber: String,
  sectionId: ObjectId
})

module.exports = mongoose.model('Section', sectionSchema)

"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let deepPopulate = require('mongoose-deep-populate')(mongoose);

let sectionSchema = new Schema({
  courseId: {type: String, ref: 'Course'},
  created: { type: Date, default: Date.now},
  startDate: { type: Date, default: Date.now},
  endDate: { type: Date, default: Date.now},
  frequency: String,
  scheduleDays: [{type: String, enum: ['M','T','W','R','F','S']}],
  scheduleTime: String,
  students: [{type: String, ref: 'StudentUser'}],
  prospectiveStudents: [{type: String, ref: 'StudentUser'}],
  instructor: {type: String, ref: 'InstructorUser'},
  sectionNumber: String,
  sectionId: ObjectId
})

sectionSchema.plugin(deepPopulate);

module.exports = mongoose.model('Section', sectionSchema)

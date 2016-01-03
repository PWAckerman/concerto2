"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let deepPopulate = require('mongoose-deep-populate')(mongoose);

let gradeSchema = new Schema({
  created: { type: Date, default: Date.now},
  studentId: {type: String, ref: 'User'},
  instructorId: {type: String, ref: 'User'},
  value: {type: Number, min: 0, max: 100},
  assignmentId: String,
  submissionId: {type: String, ref: 'Submission'},
  gradeId: ObjectId
})

gradeSchema.plugin(deepPopulate);

module.exports = mongoose.model('Grade', gradeSchema)

"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let courseSchema = new Schema({
  title: String,
  created: { type: Date, default: Date.now},
  modified: Date,
  description: String,
  students: [],
  topicIdentifier: String,
  courseNumber: String,
  courseId: ObjectId
})

module.exports = mongoose.model('Course', courseSchema)

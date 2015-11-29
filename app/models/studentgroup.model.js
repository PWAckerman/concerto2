"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let studentGroupSchema = new Schema({
  groupName: String,
  members: [],
  courseId: String,
  sectionId: String,
  groupId: ObjectId
})

module.exports = mongoose.model('StudentGroup', studentGroupSchema)

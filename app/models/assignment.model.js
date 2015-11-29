"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let assignmentSchema = new Schema({
  title: String,
  created: { type: Date, default: Date.now},
  modified: Date,
  instructions: String,
  content: Buffer,
  dueDate: Date,
  assignmentId: ObjectId
})

module.exports = mongoose.model('Assignment', assignmentSchema)

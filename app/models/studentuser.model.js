"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let studentUserSchema = new Schema({
  UID: String,
  StudentID: ObjectId,
  Courses: []
})

module.exports = mongoose.model('StudentUser', studentUserSchema);

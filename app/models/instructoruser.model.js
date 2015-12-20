"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let deepPopulate = require('mongoose-deep-populate')(mongoose);

let instructorUserSchema = new Schema({
  instructorId: ObjectId,
  courses: [{type: String, ref: 'Section'}],
  UID: {type: String, ref: 'User'}
})

instructorUserSchema.plugin(deepPopulate);

module.exports = mongoose.model('InstructorUser', instructorUserSchema)

"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let deepPopulate = require('mongoose-deep-populate')(mongoose);

let studentGroupSchema = new Schema({
  groupName: String,
  members: [{type: String, ref: 'StudentUser'}],
  courseId: String,
  sectionId: String,
  groupId: ObjectId
})

studentGroupSchema.plugin(deepPopulate);

module.exports = mongoose.model('StudentGroup', studentGroupSchema)

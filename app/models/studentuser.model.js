"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let deepPopulate = require('mongoose-deep-populate')(mongoose);

let studentUserSchema = new Schema({
  UID: {type: String, ref: 'User'},
  StudentID: ObjectId,
  courses: [{type: String, ref: 'Section'}]
})

studentUserSchema.plugin(deepPopulate);

module.exports = mongoose.model('StudentUser', studentUserSchema);

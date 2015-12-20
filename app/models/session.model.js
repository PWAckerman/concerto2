"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let deepPopulate = require('mongoose-deep-populate')(mongoose);

let sessionSchema = new Schema({
  sectionId: String,
  sessionDate: Date,
  sessionNumber: String,
  sessionId: ObjectId,
  isActive: {type: Boolean, default: false},
  joined: [{type: String, ref: 'StudentUser' }]
})

sessionSchema.plugin(deepPopulate);

module.exports = mongoose.model('Session', sessionSchema)

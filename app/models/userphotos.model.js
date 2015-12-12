"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let userPhotosSchema = new Schema({
  user: String,
  timestamp: {type: Date, default: Date.now},
  content: Object,
  userPhotosId: ObjectId
})

module.exports = mongoose.model('UserPhotos', userPhotosSchema)

"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let sharedSessionSpaceSchema = new Schema({
  sessionID: String,
  spaceID: ObjectId
})

module.exports = mongoose.model('SharedSessionSpace', sharedSessionSpaceSchema)

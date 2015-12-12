"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let userLikesSchema = new Schema({
  user: String,
  timestamp: {type: Date, default: Date.now},
  content: Object,
  userLikesId: ObjectId
})

module.exports = mongoose.model('UserLikes', userLikesSchema)

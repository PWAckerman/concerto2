"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let topLikeSchema = new Schema({
  sectionId: String,
  like: Object,
  created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('TopLike', topLikeSchema)

"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let topLikeSchema = new Schema({
  sectionId: String,
  like: Object
})

module.exports = mongoose.model('TopLike', topLikeSchema)

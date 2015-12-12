"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let fbLikeSchema = new Schema({
  user: String,
  id: String,
  name: String,
  image: String,
  selected: Boolean
})

module.exports = mongoose.model('FbLike', fbLikeSchema)

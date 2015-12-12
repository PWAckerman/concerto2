"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let fbImageSchema = new Schema({
  user: String,
  image: String,
  id: String,
  selected: Boolean
})

module.exports = mongoose.model('FbImage', fbImageSchema)

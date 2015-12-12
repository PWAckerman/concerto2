"use strict";
let mongoose = require('mongoose');
let findOrCreate = require('mongoose-findorcreate')
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let userSchema = new Schema({
  name: String,
  created: { type: Date, default: Date.now},
  modified: Date,
  status: String,
  internalID: String,
  usertype: String,
  UID: ObjectId,
  gender: String,
  fbId: {type: String, required: true},
  profilePicture: String,
  currentToken: {type: String},
  logins: {type: Number, default: 0}
})

userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);

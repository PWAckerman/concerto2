'use strict';
let User = require('../models/user.model.js');
let Log = require('../controllers/log.controller.js');

exports.addUser = (req, res) => {
  let entry = new User({
    name: req.body.name,
    created: Date.now(),
    modified: Date.now(),
    status: req.body.status,
    gender: req.body.gender,
    fbId: req.body.fbId,
    profilePicture: req.body.profilePicture,
    usertype: req.body.usertype,
    currentToken: req.body.token
  });

  entry.save(
      (err, entry) => {
        if(err){
          Log.addLog({
            status: "Database Error",
            content: err
          })
          console.log(err)
        } else {
          Log.addLog({
            status: "Successful Database Addition",
            content: entry
          })
        }
      }
  );
}

exports.getUsers = (req, res) => {
  User.find().exec((err, userDoc) => res.json(userDoc));
}
exports.getUserByFacebookId = (req, res) => {
  console.log(`Looking for Facebook User with Facebook Id being ${req.params.fbId}`)
  User.find({fbId: req.params.fbId}).exec((err, userDoc) => res.json(userDoc))
}
exports.user = [];
exports.updateUserByFacebookId = (req, res) => {
  console.log(`Updating user ${req.fbId} with new token`);
  let userQuery = User.find({fbId: req.fbId}).stream()
  userQuery.on('data', function(doc){
    console.log('this is the doc', doc);
    console.log('this is the token', req.token)
    let userQuery2 = User.findByIdAndUpdate(doc._id, {currentToken: req.token}, {new: true}).stream()
    userQuery2.on('data', function(doc2){
      console.log('This is the doc2', doc2)
      console.log('EXPORTS', exports.user)
      for (var i = 0; i < exports.user.length; i++) {
        console.log('EXPORTSID', exports.user[i]._id)
        if (exports.user[i]._id.toString() === doc2._id.toString()) {
          console.log('User already logged in.')
          return
        }
      }
      exports.user.push(doc2);
      return doc2
    })
  })
}

exports.getUser = (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id, (err, doc)=> {
    res ? res.json(doc) : doc
  })
}

exports.updateUser = (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  User.findByIdAndUpdate(req.params.id, { $set: req.body}, (err, doc) => {
    console.log('You made it this far', err, doc)
    err ? res.json(err) : res.json(doc)
  })
}

exports.userExists = (req, res) => {
  console.log(`Checking if user ${req.fbId} exists...`);
  console.log(User.find().where({'fbId': req.fbId}).exec((err, userDoc) => userDoc))
  User.find({'fbId': req.fbId}).exec((err, doc) => doc).length > 0 ? true : false
}

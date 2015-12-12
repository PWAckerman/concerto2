'use strict';
let Likes = require('../models/userlikes.model.js'),
  FbLike = require('../models/fblike.model.js'),
  Photos = require('../models/userphotos.model.js'),
  FbImage = require('../models/fbimage.model.js'),
  Education = require('../models/usereducation.model.js'),
  FbSchools = require('../models/fbschool.model.js'),
  Log = require('../controllers/log.controller.js')

exports.getLikes = (req, res) => {
  console.log(req.params.id);
  Likes.findOne({user: req.params.id}, (err, doc)=> {
    res.json(doc);
  })
}

exports.addLike = (req, res) => {
  let entry = new FbLike(req.body);
  entry.save((err, entry) => {
      if(err){
        Log.addLog({
          status: "Database Error",
          content: err
        })
        console.log(err)
        res.json(err)
      } else {
        Log.addLog({
          status: "Successful Database Addition",
          content: entry
        })
        res.json(entry)
      }
    })
}
exports.addImage = (req, res) => {
  let entry = new FbImage(req.body);
  entry.save((err, entry) => {
      if(err){
        Log.addLog({
          status: "Database Error",
          content: err
        })
        console.log(err)
        res.json(err)
      } else {
        Log.addLog({
          status: "Successful Database Addition",
          content: entry
        })
        res.json(entry)
      }
    })
}
exports.addSchool = (req, res) => {
  let entry = new FbSchool(req.body);
  entry.save((err, entry) => {
      if(err){
        Log.addLog({
          status: "Database Error",
          content: err
        })
        console.log(err)
        res.json(err)
      } else {
        Log.addLog({
          status: "Successful Database Addition",
          content: entry
        })
        res.json(entry)
      }
    })
}

exports.getPhotos = (req, res) => {
  console.log(req.params.id);
  Photos.findOne({user: req.params.id}, (err, doc)=> {
    res.json(doc);
  })
}

exports.getEducation = (req, res) => {
  console.log(req.params.id);
  Education.findOne({user: req.params.id}, (err, doc)=> {
    res.json(doc);
  })
}

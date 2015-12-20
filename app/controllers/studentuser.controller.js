'use strict';
let StudentUser = require('../models/studentuser.model.js');
let Section = require('../models/section.model.js');
let Log = require('../controllers/log.controller.js');

exports.addStudentUser = (req, res) => {
  let entry = new StudentUser({
    UID: req.body.UID
  });

  entry.save(
      (err, entry) => {
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
      }
  );
}

exports.getStudentUsers = (req, res) => {
  StudentUser.find().exec((err, userDoc) => res.json(userDoc));
}

exports.getStudentUser = (req, res) => {
  console.log(req.params.id);
  StudentUser.findOne({UID: req.params.id}).deepPopulate(['courses', 'courses.instructor','courses.courseId','courses.instructor.UID']).exec((err, doc)=> {
      res.json(doc)
  })
}

exports.updateStudentUser = (req, res) => {
  console.log('STUDENT USER ADDING THIS COURSE TO THE ARRAY', req.body)
  StudentUser.findByIdAndUpdate(req.params.id, {$addToSet: {courses: req.body.courseId}}, {new: true}).exec((err, doc) => {
    res.json(doc)
  })
}

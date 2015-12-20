'use strict';
let InstructorUser = require('../models/instructoruser.model.js');
let Log = require('../controllers/log.controller.js');

exports.addInstructorUser = (req, res) => {
  let entry = new InstructorUser({
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

exports.getInstructorUsers = (req, res) => {
  InstructorUser.find().exec((err, userDoc) => res.json(userDoc));
}

exports.getInstructorUser = (req, res) => {
  console.log(req.params.id);
  InstructorUser.findById(req.params.id).deepPopulate(['courses', 'courses.instructor','courses.courseId','courses.instructor.UID']).exec((err, doc)=> {
    res.json(doc);
  })
}
exports.findInstructorUser = (req, res) => {
  InstructorUser.find({UID: req.params.id}).deepPopulate(['courses', 'courses.instructor','courses.courseId','courses.instructor.UID']).exec((err, doc)=> {
    res.json(doc[0]);
  })
}

exports.updateInstructorUser = (req, res) => {
  console.log(req.params.id);
  InstructorUser.findByIdAndUpdate(req.params.id, { $addToSet: {courses: req.body._id}}, {new: true}).populate('courses').exec((err, doc)=> {
    res.json(doc);
  })
}

'use strict';
let Course = require('../models/course.model.js');
let Log = require('../controllers/log.controller.js');

exports.addCourse = (req, res) => {
  let entry = new Course({
    title: req.body.title,
    description: req.body.description,
    students: [],
    courseNumber: req.body.courseNumber,
    topicIdentifier: req.body.topicIdentifier,
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

exports.getCourses = (req, res) => {
  Course.find().exec((err, courseDoc) => res.json(courseDoc));
}

exports.getCourse = (req, res) => {
  console.log(req.params.id);
  Course.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}

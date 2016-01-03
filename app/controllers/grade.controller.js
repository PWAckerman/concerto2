'use strict';
let Grade = require('../models/grade.model.js');
let Log = require('../controllers/log.controller.js');

exports.addGrade = (req, res) => {
  let entry = new Grade({
    studentId: req.body.studentId,
    instructorId: req.body.instructorId,
    submissionId: req.body.submissionId,
    value: req.body.value,
    assignmentId: req.body.assignmentId
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

exports.getGrades = (req, res) => {
  Grade.find().exec((err, gradeDoc) => res.json(gradeDoc));
}

exports.getGrade = (req, res) => {
  console.log(req.params.id);
  Grade.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}
exports.findGrade = (req, res) => {
  Grade.findOne({submissionId: req.params.id}, (err, doc)=> {
    res.json(doc)
  })
}

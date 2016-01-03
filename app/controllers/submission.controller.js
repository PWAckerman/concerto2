'use strict';
let Submission = require('../models/submission.model.js');
let Log = require('../controllers/log.controller.js');

exports.addSubmission = (req, res) => {
  let entry = new Submission({
    sessionId: req.body.sessionId,
    studentId: req.body.studentId,
    content: req.body.content,
    assignmentId: req.body.assignmentId,
    isGraded: false
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

exports.getSubmissions = (req, res) => {
  Submission.find().exec((err, assignmentDoc) => res.json(assignmentDoc));
}

exports.getSubmission = (req, res) => {
  console.log(req.params.id);
  Submission.find({assignmentId: req.params.id}).deepPopulate(['studentId','assignmentId']).exec((err, doc)=> {
    res.json(doc);
  })
}

exports.toggleIsGraded = (req, res) => {
  console.log(req.params.id);
  Submission.findByIdAndUpdate(req.params.id, {isGraded: true}, {new: true}, (err, doc) => {
    res.json(doc)
  });
}

exports.getSubmissionByStudentAndAssignment = (req, res) => {
  Submission.find({assignmentId: req.params.assignmentId, studentId: req.params.studentId}, (err, doc) => {
    res.json(doc)
  })
}

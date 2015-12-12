'use strict';
let GradeRecord = require('../models/graderecord.model.js');
let Log = require('../controllers/log.controller.js');

exports.addGradeRecord = (req, res) => {
  let entry = new GradeRecord({
    courseId: req.body.courseId,
    sectionId: req.body.sectionId,
    studentId: req.body.studentId,
    grades: [],
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

exports.getGradeRecords = (req, res) => {
  GradeRecord.find().exec((err, gradeRecordDoc) => res.json(gradeRecordDoc));
}

exports.getGradeRecord = (req, res) => {
  console.log(req.params.id);
  GradeRecord.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}

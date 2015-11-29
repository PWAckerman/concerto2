var GradeRecord = require('../models/graderecord.model.js');

exports.addGradeRecord = (req, res) => {
  var entry = new GradeRecord({
    courseId: req.body.courseId,
    sectionId: req.body.sectionId,
    studentId: req.body.studentId,
    grades: [],
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
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

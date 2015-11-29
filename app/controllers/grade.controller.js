var Grade = require('../models/grade.model.js');

exports.addGrade = (req, res) => {
  var entry = new Grade({
    studentId: req.body.studentId,
    value: req.body.value,
    assignmentId: req.body.assignmentId
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
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

var StudentGroup = require('../models/studentgroup.model.js');

exports.addStudentGroup = (req, res) => {
  var entry = new StudentGroup({
    groupName: req.body.groupName,
    members: [],
    courseId: req.body.courseId,
    sectionId: req.body.sectionId,
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
      }
  );
}

exports.getStudentGroups = (req, res) => {
  StudentGroup.find().exec((err, studentGroupDoc) => res.json(studentGroupDoc));
}

exports.getStudentGroup = (req, res) => {
  console.log(req.params.id);
  StudentGroup.findById(req.params.id, (err, doc) => {
    res.json(doc);
  })
}

'use strict';
let StudentGroup = require('../models/studentgroup.model.js');
let Log = require('../controllers/log.controller.js');

exports.addStudentGroup = (req, res) => {
  let entry = new StudentGroup({
    groupName: req.body.groupName,
    members: req.body.members,
    courseId: req.body.courseId,
    sectionId: req.body.sectionId,
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

exports.getStudentGroups = (req, res) => {
  StudentGroup.find().exec((err, studentGroupDoc) => res.json(studentGroupDoc));
}

exports.getSectionGroups = (req, res) => {
  console.log(req.params)
  StudentGroup.find({sectionId: req.params.id}).deepPopulate(['members', 'members.UID']).exec((err, studentGroupDoc) => {
    console.log(studentGroupDoc);
    res.json(studentGroupDoc)
  });
}

exports.getStudentGroup = (req, res) => {
  console.log(req.params.id);
  StudentGroup.findById(req.params.id, (err, doc) => {
    res.json(doc);
  })
}

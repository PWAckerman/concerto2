'use strict';
let Section = require('../models/section.model.js');
let Log = require('../controllers/log.controller.js');

exports.addSection = (req, res) => {
  let entry = new Section({
    courseId: req.body.courseId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    frequency: req.body.frequency,
    scheduleDays: req.body.scheduleDays,
    scheduleTime: req.body.scheduleTime,
    sectionNumber: req.body.sectionNumber,
    instructor: req.body.instructor
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

exports.getSections = (req, res) => {
  Section.find().exec((err, sectionDoc) => res.json(sectionDoc));
}

exports.getSection = (req, res) => {
  console.log(req.params.id);
  Section.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}

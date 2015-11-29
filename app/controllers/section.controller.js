var Section = require('../models/section.model.js');

exports.addSection = (req, res) => {
  var entry = new Section({
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
        err ? console.log(err) : res.json(entry)
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

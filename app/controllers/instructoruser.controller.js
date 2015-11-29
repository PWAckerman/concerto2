var InstructorUser = require('../models/instructoruser.model.js');

exports.addInstructorUser = (req, res) => {
  var entry = new InstructorUser({
    UID: req.body.uid
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
      }
  );
}

exports.getInstructorUsers = (req, res) => {
  InstructorUser.find().exec((err, userDoc) => res.json(userDoc));
}

exports.getInstructorUser = (req, res) => {
  console.log(req.params.id);
  InstructorUser.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}

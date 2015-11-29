var StudentUser = require('../models/studentuser.model.js');

exports.addStudentUser = (req, res) => {
  var entry = new StudentUser({
    UID: req.body.uid
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
      }
  );
}

exports.getStudentUsers = (req, res) => {
  StudentUser.find().exec((err, userDoc) => res.json(userDoc));
}

exports.getStudentUser = (req, res) => {
  console.log(req.params.id);
  StudentUser.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}

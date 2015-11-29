var Session = require('../models/session.model.js');

exports.addSession = (req, res) => {
  var entry = new Session({
    sectionId: req.body.sectionId,
    sessionDate: req.body.sessionDate || Date.now(),
    sessionNumber: req.body.sessionNumber
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
      }
  );
}

exports.getSessions = (req, res) => {
  Session.find().exec((err, sessionDoc) => res.json(sessionDoc));
}

exports.getSession = (req, res) => {
  console.log(req.params.id);
  Session.findById(req.params.id, (err, doc) => {
    res.json(doc);
  })
}

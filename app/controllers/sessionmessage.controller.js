var SessionMessage = require('../models/sessionMessage.model.js');

exports.addSessionMessage = (req, res) => {
  var entry = new SessionMessage({
    sessionId: req.body.sessionId,
    user: req.body.user,
    content: req.body.content,
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
      }
  );
}

exports.getSessionMessages = (req, res) => {
  SessionMessage.find().exec((err, sessionMessageDoc) => res.json(sessionMessageDoc));
}

exports.getSessionMessage = (req, res) => {
  console.log(req.params.id);
  SessionMessage.findById(req.params.id, (err, doc) => {
    res.json(doc);
  })
}

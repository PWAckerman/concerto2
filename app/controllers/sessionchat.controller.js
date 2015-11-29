var SessionChat = require('../models/sessionchat.model.js');

exports.addSessionChat = (req, res) => {
  var entry = new SessionChat({
    sessionId: req.body.sessionId
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
      }
  );
}

exports.getSessionChats = (req, res) => {
  SessionChat.find().exec((err, sessionChatDoc) => res.json(sessionChatDoc));
}

exports.getSessionChat = (req, res) => {
  console.log(req.params.id);
  SessionChat.findById(req.params.id, (err, doc) => {
    res.json(doc);
  })
}

'use strict';
let SessionChat = require('../models/sessionchat.model.js');
let Log = require('../controllers/log.controller.js');

exports.addSessionChat = (req, res) => {
  let entry = new SessionChat({
    sessionId: req.body.sessionId
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

exports.startSessionChat = (req, res) => {
  let entry = new SessionChat({
    sessionId: req.params.id
  })

  return entry.save()
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

exports.getSessionChatBySession = (req, res) => {
  console.log(req.params.id);
  SessionChat.findOne({sessionId: req.params.id}).exec((err, sessionChatDoc) => res.json(sessionChatDoc))
}

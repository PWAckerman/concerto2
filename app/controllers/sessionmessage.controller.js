'use strict';
let SessionMessage = require('../models/sessionMessage.model.js');
let Log = require('../controllers/log.controller.js');

exports.addSessionMessage = (req, res) => {
  let entry = new SessionMessage({
    sessionChatId: req.body.sessionChatId,
    user: req.body.user,
    content: req.body.content,
    name: req.body.name,
    img: req.body.img
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
          return entry
        }
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

exports.getSessionMessageBySessionChat = (req, res) => {
  console.log(req.params.id);
  SessionMessage.find({sessionChatId: req.params.id}).deepPopulate(['user'], {
    whitelist: [],
    populate: {
      'user': {
        select: 'profilePicture'
      }
    },
    rewrite: {}
  }).exec((err, sessionMessageDoc) => res.json(sessionMessageDoc))
}

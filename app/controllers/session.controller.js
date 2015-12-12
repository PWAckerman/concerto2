'use strict';
let Session = require('../models/session.model.js');
let Log = require('../controllers/log.controller.js');

exports.addSession = (req, res) => {
  let entry = new Session({
    sectionId: req.body.sectionId,
    sessionDate: req.body.sessionDate || Date.now(),
    sessionNumber: req.body.sessionNumber
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

exports.getSessions = (req, res) => {
  Session.find().exec((err, sessionDoc) => res.json(sessionDoc));
}

exports.getSession = (req, res) => {
  console.log(req.params.id);
  Session.findById(req.params.id, (err, doc) => {
    res.json(doc);
  })
}

'use strict';
let SharedSessionSpace = require('../models/sharedsessionSpace.model.js');
let Log = require('../controllers/log.controller.js');

exports.addSharedSessionSpace = (req, res) => {
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

exports.getSharedSessionSpaces = (req, res) => {
  SharedSessionSpace.find().exec((err, sharedSessionSpaceDoc) => res.json(sharedSessionSpaceDoc));
}

exports.getSharedSessionSpace = (req, res) => {
  console.log(req.params.id);
  SharedSessionSpace.findById(req.params.id, (err, doc) => {
    res.json(doc);
  })
}

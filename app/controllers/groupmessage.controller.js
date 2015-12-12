'use strict';
let GroupMessage = require('../models/groupMessage.model.js');
let Log = require('../controllers/log.controller.js');

exports.addGroupMessage = (req, res) => {
  let entry = new GroupMessage({
    groupChatId: req.body.groupChatId,
    content: req.body.content,
    user: req.body.user,
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

exports.getGroupMessages = (req, res) => {
  GroupMessage.find().exec((err, groupMessageDoc) => res.json(groupMessageDoc));
}

exports.getGroupMessage = (req, res) => {
  console.log(req.params.id);
  GroupMessage.findById(req.params.id, (err, doc) => {
    res.json(doc);
  })
}

'use strict';
let GroupChat = require('../models/groupChat.model.js');
let Log = require('../controllers/log.controller.js');

exports.addGroupChat = (req, res) => {
  let entry = new GroupChat({
    groupId: req.body.groupId
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

exports.getGroupChats = (req, res) => {
  GroupChat.find().exec((err, groupChatDoc) => res.json(groupChatDoc));
}

exports.getGroupChat = (req, res) => {
  console.log(req.params.id);
  GroupChat.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}

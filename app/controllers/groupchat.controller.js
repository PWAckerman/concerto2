var GroupChat = require('../models/groupChat.model.js');

exports.addGroupChat = (req, res) => {
  var entry = new GroupChat({
    groupId: req.body.groupId
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
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

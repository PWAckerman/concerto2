var GroupMessage = require('../models/groupMessage.model.js');

exports.addGroupMessage = (req, res) => {
  var entry = new GroupMessage({
    groupChatId: req.body.groupChatId,
    content: req.body.content,
    user: req.body.user,
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
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

var SharedSessionSpace = require('../models/sharedsessionSpace.model.js');

exports.addSharedSessionSpace = (req, res) => {
  var entry = new SessionChat({
    sessionId: req.body.sessionId
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
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

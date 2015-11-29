var User = require('../models/user.model.js');

exports.addUser = (req, res) => {
  var entry = new User({
    name: req.body.name,
    created: Date.now(),
    modified: Date.now(),
    status: req.body.status,
    internalId: Math.floor(Math.random() * 100000),
    usertype: req.body.usertype
  });

  entry.save(
    // (err) => console.log(err)
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
      }
  );
}

exports.getUsers = (req, res) => {
  User.find().exec((err, userDoc) => res.json(userDoc));
}

exports.getUser = (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}

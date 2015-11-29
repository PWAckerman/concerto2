var Assignment = require('../models/assignment.model.js');

exports.addAssignment = (req, res) => {
  var entry = new Assignment({
    title: req.body.title,
    instructions: req.body.instructions,
    content: req.body.content,
    dueDate: req.body.dueDate
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
      }
  );
}

exports.getAssignments = (req, res) => {
  Assignment.find().exec((err, assignmentDoc) => res.json(assignmentDoc));
}

exports.getAssignment = (req, res) => {
  console.log(req.params.id);
  Assignment.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}

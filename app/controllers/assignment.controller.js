'use strict';
let Assignment = require('../models/assignment.model.js');
let Log = require('../controllers/log.controller.js');

exports.addAssignment = (req, res) => {
  let entry = new Assignment({
    title: req.body.title,
    instructions: req.body.instructions,
    content: req.body.content,
    dueDate: req.body.dueDate
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

exports.getAssignments = (req, res) => {
  Assignment.find().exec((err, assignmentDoc) => res.json(assignmentDoc));
}

exports.getAssignment = (req, res) => {
  console.log(req.params.id);
  Assignment.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}

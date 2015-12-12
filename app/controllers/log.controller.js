'use strict';
let Log = require('../models/log.model.js');

exports.addLog = (req, res) => {
  console.log(req);
  console.log(res);
  let entry = new Log({
    status: req.status,
    content: req.content
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : console.log(entry)
      }
  );
}

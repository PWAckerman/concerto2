var Course = require('../models/course.model.js');

exports.addCourse = (req, res) => {
  var entry = new Course({
    title: req.body.title,
    description: req.body.description,
    students: [],
    courseNumber: req.body.courseNumber,
    topicIdentifier: req.body.topicIdentifier,
  });

  entry.save(
      (err, entry) => {
        err ? console.log(err) : res.json(entry)
      }
  );
}

exports.getCourses = (req, res) => {
  Course.find().exec((err, courseDoc) => res.json(courseDoc));
}

exports.getCourse = (req, res) => {
  console.log(req.params.id);
  Course.findById(req.params.id, (err, doc)=> {
    res.json(doc);
  })
}

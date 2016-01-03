"use strict";
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let deepPopulate = require('mongoose-deep-populate')(mongoose);

let submissionSchema = new Schema({
  submissionId: ObjectId,
  sessionId: {type: String, ref: 'Session'},
  studentId: {type: String, ref: 'User'},
  created: { type: Date, default: Date.now},
  content: String,
  assignmentId: {type: String, ref: 'Assignment'},
  isGraded: Boolean
})

submissionSchema.plugin(deepPopulate)

module.exports = mongoose.model('Submission', submissionSchema)

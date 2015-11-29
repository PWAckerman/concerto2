'use strict';
let express = require('express'),
    concerto = express(),
    userCtrl = require('./app/controllers/user.controller.js'),
    studentUserCtrl = require('./app/controllers/studentuser.controller.js'),
    instructorUserCtrl = require('./app/controllers/instructoruser.controller.js'),
    assignmentCtrl = require('./app/controllers/assignment.controller.js'),
    courseCtrl = require('./app/controllers/course.controller.js'),
    gradeCtrl = require('./app/controllers/grade.controller.js'),
    gradeRecordCtrl = require('./app/controllers/graderecord.controller.js'),
    groupChatCtrl = require('./app/controllers/groupchat.controller.js'),
    groupMessageCtrl = require('./app/controllers/groupmessage.controller.js'),
    sectionCtrl = require('./app/controllers/section.controller.js'),
    sessionCtrl = require('./app/controllers/session.controller.js'),
    sessionChatCtrl = require('./app/controllers/sessionchat.controller.js'),
    sessionMessageCtrl = require('./app/controllers/sessionmessage.controller.js'),
    sharedSessionSpaceCtrl = require('./app/controllers/sharedsessionspace.controller.js'),
    studentGroupCtrl = require('./app/controllers/studentgroup.controller.js'),
    logger = require('morgan'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = 3030,
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

concerto
  // .set('views', __dirname + '/app/views')
  // .use(express.static(__dirname + '/public'))
  .use(logger('dev'))
  // .get('*', function(req, res){
  //
  // })
  .use(bodyParser.json())
  .use(cors())
  .get('/',
    (req, res)=> {
      // res.render('index')
      res.json('Working...')
    }
  )
  .get('/users',
    (req, res) => {
      return userCtrl.getUsers(req, res);
    }
  )
  .get('/users/:id',
    (req, res) => {
      return userCtrl.getUser(req, res);
    }
  )
  .get('/studentusers',
    (req, res) => {
      return studentUserCtrl.getStudentUsers(req, res);
    }
  )
  .get('/studentusers/:id',
    (req, res) => {
      return studentUserCtrl.getStudentUser(req, res);
    }
  )
  .post('/studentusers',
    (req, res) => {
      return studentUserCtrl.addStudentUser(req, res);
    }
  )
  .get('/instructorusers',
    (req, res) => {
      return instructorUserCtrl.getInstructorUsers(req, res);
    }
  )
  .get('/instructorusers/:id',
    (req, res) => {
      return instructorUserCtrl.getInstructorUser(req, res);
    }
  )
  .post('/instructorusers',
    (req, res) => {
      return instructorUserCtrl.addInstructorUser(req, res);
    }
  )
  .post('/users',
    (req, res) => {
      return userCtrl.addUser(req, res)
    }
  )
  .get('/assignments',
    (req, res) => {
      return assignmentCtrl.getAssignments(req, res);
    }
  )
  .get('/assignments/:id',
    (req, res) => {
      return assignmentCtrl.getAssignment(req, res);
    }
  )
  .post('/assignments',
    (req, res) => {
      return assignmentCtrl.addAssignment(req, res);
    }
  )
  .get('/courses',
    (req, res) => {
      return courseCtrl.getCourses(req, res);
    }
  )
  .get('/grades',
    (req, res) => {
      return gradeCtrl.getGrades(req, res);
    }
  )
  .get('/grades/:id',
    (req, res) => {
      return gradeCtrl.getGrade(req, res);
    }
  )
  .post('/grades',
    (req, res) => {
      return gradeCtrl.addGrade(req, res);
    }
  )
  .get('/graderecords',
    (req, res) => {
      return gradeRecordCtrl.getGradeRecords(req, res);
    }
  )
  .get('/graderecords/:id',
    (req, res) => {
      return gradeRecordCtrl.getGradeRecord(req, res);
    }
  )
  .post('/graderecords',
    (req, res) => {
      return gradeRecordCtrl.addGradeRecord(req, res);
    }
  )
  .get('/groupchats',
    (req, res) => {
      return groupChatCtrl.getGroupChats(req, res);
    }
  )
  .get('/groupchats/:id',
    (req, res) => {
      return groupChatCtrl.getGroupChat(req, res);
    }
  )
  .post('/groupchats',
    (req, res) => {
      return groupChatCtrl.addGroupChat(req, res);
    }
  )
  .get('/groupmessages',
    (req, res) => {
      return groupMessageCtrl.getGroupMessages(req, res);
    }
  )
  .get('/groupmessages/:id',
    (req, res) => {
      return groupMessageCtrl.getGroupMessage(req, res);
    }
  )
  .post('/groupmessages',
    (req, res) => {
      return groupMessageCtrl.addGroupMessage(req, res);
    }
  )
  .get('/sections',
    (req, res) => {
      return sectionCtrl.getSections(req, res);
    }
  )
  .get('/sections/:id',
    (req, res) => {
      return sectionCtrl.getSections(req, res);
    }
  )
  .post('/sections',
    (req, res) => {
      return sectionCtrl.addSection(req, res);
    }
  )
  .get('/sessions',
    (req, res) => {
      return sessionCtrl.getSessions(req, res);
    }
  )
  .get('/sessions/:id',
    (req, res) => {
      return sessionCtrl.getSession(req, res);
    }
  )
  .post('/sessions',
    (req, res) => {
      return sessionCtrl.addSession(req, res);
    }
  )
  .get('/sessionchats',
    (req, res) => {
      return sessionChatCtrl.getSessionChats(req, res);
    }
  )
  .get('/sessionchats/:id',
    (req, res) => {
      return sessionChatCtrl.getSessionChat(req, res);
    }
  )
  .post('/sessionchats',
    (req, res) => {
      return sessionChatCtrl.addSessionChat(req, res);
    }
  )
  .get('/sessionmessages',
    (req, res) => {
      return sessionMessageCtrl.getSessionMessages(req, res);
    }
  )
  .get('/sessionmessages/:id',
    (req, res) => {
      return sessionMessageCtrl.getSessionMessage(req, res);
    }
  )
  .post('/sessionmessages',
    (req, res) => {
      return sessionMessageCtrl.addSessionMessage(req, res);
    }
  )
  .get('/sharedsessionspaces',
    (req, res) => {
      return sharedSessionSpaceCtrl.getSharedSessionSpaces(req, res);
    }
  )
  .get('/sharedsessionspaces/:id',
    (req, res) => {
      return sharedSessionSpaceCtrl.getSharedSessionSpace(req, res);
    }
  )
  .post('/sharedsessionspaces',
    (req, res) => {
      return sharedSessionSpaceCtrl.addSharedSessionSpace(req, res);
    }
  )
  .get('/studentgroups/',
    (req, res) => {
      return studentGroupCtrl.getStudentGroup(req, res);
    }
  )
  .get('/studentgroups/:id',
    (req, res) => {
      return studentGroupCtrl.getStudentGroup(req, res);
    }
  )
  .post('/studentgroups/',
    (req, res) => {
      return studentGroupCtrl.addStudentGroup(req, res);
    }
  )
  .get('/courses/:id',
    (req, res) => {
      return courseCtrl.getCourse(req, res);
    }
  )
  .post('/courses',
    (req, res) => {
      return courseCtrl.addCourse(req, res);
    }
  )

  .listen(port)

console.log('Listening on port ' + port + '...');
mongoose.connect('mongodb://localhost/concerto');
let db = mongoose.connection;
db
  .on('error', console.error.bind(console, 'connection error...'))
  .once('open', () => console.log('database connection established'))

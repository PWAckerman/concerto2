'use strict';
let express = require('express'),
    concerto = express(),
    userCtrl = require('./app/controllers/user.controller.js'),
    studentUserCtrl = require('./app/controllers/studentuser.controller.js'),
    instructorUserCtrl = require('./app/controllers/instructoruser.controller.js'),
    assignmentCtrl = require('./app/controllers/assignment.controller.js'),
    submissionCtrl = require('./app/controllers/submission.controller.js'),
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
    logCtrl = require('./app/controllers/log.controller.js'),
    facebookCtrl = require('./app/controllers/facebook.controller.js'),
    FacebookStrategy = require('passport-facebook').Strategy,
    FacebookConfig = require('./config/config.js').FACEBOOK_CONF,
    graph = require('fbgraph'),
    passport = require('passport'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    session = require("express-session"),
    cookieParser = require('cookie-parser'),
    requestify = require('requestify'),
    errorHandler = require('errorhandler'),
    server = require('http').Server(concerto),
    io = require('socket.io')(server),
    User = require('./app/models/user.model.js'),
    UserEducation = require('./app/models/usereducation.model.js'),
    UserFriends = require('./app/models/userfriends.model.js'),
    UserLikes = require('./app/models/userlikes.model.js'),
    UserPhotos = require('./app/models/userphotos.model.js'),
    Section = require('./app/models/section.model.js'),
    FBLike = require('./app/models/fblike.model.js'),
    TopLike = require('./app/models/topLike.model.js'),
    port = 3030,
    sockets = {},
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(env === 'development'){
  concerto.use(errorHandler())
}
let auth = function(req, res, next){
      if(!req.isAuthenticated()){
        console.log('Some jerk is trying to access unauthorized endpoints');
        res.status(401).end()
      } else {
        next();
      }
    }

graph.setAppSecret(FacebookConfig.app_secret);
server.listen(port)
console.log(`${env} mode`)

concerto
  .set('views', __dirname + '/app/views')
  .use(express.static(__dirname + '/public'))

  .use(logger('dev'))
  // .get('*', function(req, res){
  //
  // })
  .use(bodyParser.json())
  .use(bodyParser.urlencoded())
  .use(cookieParser())
  .use(cors())
  .use(session({secret: 'anything'}))
  .use(passport.initialize())
  .use(passport.session())
  .get('/',
    (req, res)=> {
      res.render('index')
      // console.log('Working...');
      // res.json('Working...')
    }
  )
  .get('/logout', (req, res) => {
    req.logout()
    logCtrl.addLog({
      status: "User has logged out",
      content: ''
    })
    console.log('log out...')
    // io.on('connection', function (socket) {
    //   io.to(socket.id).emit('loggedOut', {message: 'User has logged out'});
    //   socket.on('disconnect', function(){
    //     console.log('Mr. Gorbachev, TEAR DOWN THIS SOCKET');
    //     // socket.destroy()
    //   })
    // });
    res.redirect('/')
  })
  .get('/logmein', (req, res) => {
    requestify.get('http://localhost:3030/auth/facebook/callback').then(function(response){
      console.log(response.getBody())
    })
  })
  .get('/users', auth,
    (req, res) => {
      return userCtrl.getUsers(req, res);
    }
  )
  .get('/section/sessions/:id',
    (req, res) => {
      return sessionCtrl.getSessionsBySection(req, res)
    }
  )

  .get('/users/:id',
    (req, res) => {
      return userCtrl.getUser(req, res);
    }
  )
  .patch('/users/:id',
    (req, res) => {
      return userCtrl.updateUser(req, res);
    }
  )
  .get('/fbid/:fbId',
    (req, res) => {
      return userCtrl.getUserByFacebookId(req, res)
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
      console.log(req.body)
      return studentUserCtrl.addStudentUser(req, res);
    }
  )
  .patch('/studentusers/courses/:id',
    (req, res) => {
      return studentUserCtrl.updateStudentUser(req, res);
    }
  )
  .post('/fb/likes/', (req, res) => {
     return facebookCtrl.addLike(req, res);
  })
  .post('/fb/images/', (req, res) => {
     return facebookCtrl.addImage(req, res);
  })
  .post('/fb/school/', (req, res) => {
     return facebookCtrl.addSchool(req, res);
  })
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
  .get('/instructorusers/users/:id',
    (req, res) => {
      return instructorUserCtrl.findInstructorUser(req, res);
    }
  )
  .post('/instructorusers',
    (req, res) => {
      console.log(req.body)
      return instructorUserCtrl.addInstructorUser(req, res);
    }
  )
  .patch('/instructorusers/:id',
    (req, res) => {
      console.log(req.body)
      return instructorUserCtrl.updateInstructorUser(req, res);
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
  // .get('/submissions',
  //   (req, res) => {
  //     return submissionCtrl.getSubmissions(req, res)
  //   }
  // )
  .get('/submissions/assignments/:id',
    (req, res) => {
      return submissionCtrl.getSubmission(req, res)
    }
  )
  .get('/submissions/:id',
    (req, res) => {
      return submissionCtrl.getSubmission(req, res)
    }
  )
  .patch('/submissions/:id',
    (req, res) => {
      return submissionCtrl.toggleIsGraded(req, res);
    }
)
  .get('/submissions/:assignmentId/student/:studentId',
    (req, res) => {
      return submissionCtrl.getSubmissionByStudentAndAssignment(req, res)
    }
  )
  .post(
    '/submissions',
    (req, res) => {
      return submissionCtrl.addSubmission(req, res)
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
  .get('/grades/submissions/:id',
    (req, res) => {
      return gradeCtrl.findGrade(req, res);
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
      return sectionCtrl.getSection(req, res);
    }
  )
  .get('/photos/images/:id', (req, res) => {
    graph.get(req.params.id + '?fields=images', (err, response) => {
      res.json(response.images)
    })
  })
  .get('/likes/data/:id', (req, res) => {
    graph.get(req.params.id + '/picture?type=large', (err, response) => {
      console.log(response)
      res.json(response)
    })
  })
  .get('/education/data/:id', (req, res) => {
    graph.get(req.params.id + '/picture?type=large', (err, response) => {
      console.log(response)
      res.json(response)
    })
  })
  .post('/sections',
    (req, res) => {
      return sectionCtrl.addSection(req, res);
    }
  )
  .post('/section/enrollment/:id',
    (req, res) => {
      console.log(req.body);
      return sectionCtrl.requestSection(req, res);
  })
  .post('/section/approval/:id',
    (req, res) => {
      return sectionCtrl.approveStudent(req, res);
  })
  .post('/section/deny/:id',
  (req, res) => {
    return sectionCtrl.denyStudent(req, res);
  })
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
  .patch('/sessions/:id',
    (req, res) => {
      return sessionCtrl.toggleActive(req, res);
    }
  )
  .patch('/sessions/join/:id',
    (req, res) => {
      return sessionCtrl.joinSession(req, res)
    }
  )
  .patch('/sessions/exit/:id',
    (req, res) => {
      return sessionCtrl.exitSession(req, res)
    }
  )
  .get('/likes/:id',
    (req, res) => {
      return facebookCtrl.getLikes(req, res);
    }
  )
  .get('/education/:id',
    (req, res) => {
      return facebookCtrl.getEducation(req, res);
    }
  )
  .get('/photos/:id',
    (req, res) => {
      return facebookCtrl.getPhotos(req, res);
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
  .get('/sessionchats/bysession/:id',
    (req, res) => {
      return sessionChatCtrl.getSessionChatBySession(req, res);
    }
  )
  .post('/sessionchats',
    (req, res) => {
      return sessionChatCtrl.addSessionChat(req, res);
    }
  )
  .post('/sessionchats/initialize/:id',
    (req, res) => {
      sessionChatCtrl.startSessionChat(req, res).then(
        (response) => {
          console.log(response)
          });
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
  .get('/sessionmessages/bysessionchat/:id',
    (req, res) => {
      return sessionMessageCtrl.getSessionMessageBySessionChat(req, res)
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
  .get('/authed/me', auth,
      (req, res) => {
        console.log(req.user)
        res.json(req.user)
      }
    )
  .get('/studentgroups/:id',
    (req, res) => {
      return studentGroupCtrl.getStudentGroup(req, res);
    }
  )
  .get('/sectiongroups/:id',
    (req, res) => {
      return studentGroupCtrl.getSectionGroups(req, res);
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

  // .listen(port)

passport.use('facebook',
  new FacebookStrategy(
    {
      clientID: FacebookConfig.clientID,
      clientSecret: FacebookConfig.clientSecret,
      callbackURL: FacebookConfig.callbackURL,
      profileFields: ['id', 'displayName', 'photos', 'emails', 'gender', 'profileUrl']
    },
    (accessToken, refreshToken, profile, done) => {

      graph.setAccessToken(accessToken)
      User.findOrCreate({ fbId: profile.id},
          {
            name: profile.displayName,
            status: 'Active',
            usertype: '',
            gender: profile.gender,
            fbId: profile.id,
            profilePicture: '',
            internalId: Math.floor(Math.random() * 100000),
            currentToken: accessToken
          }, function (err, user, created) {
                if(created === false){
                  console.log('User exists, updating their token')
                  User.findOneAndUpdate({ fbId: profile.id}, {
                    $set: {currentToken: accessToken}, $inc: { logins: 1} }, { new: true }, function(err, doc){
                      user = doc;
                      // io.on('connection', function (socket) {
                      //   console.log('I am the user in Socket IO', user);
                      //   sockets[profile.id] = socket.id;
                      //   console.log(sockets)
                      //   io.to(sockets[profile.id]).emit('userEmitted', user);
                      //   console.log('USER EMITTED', Date.now())
                      //   socket.on('disconnect', function(){
                      //     // socket.destroy()
                      //   })
                      // });
                      return done(null, user);
                  })
                } else {
                  graph.batch([{
                    method: 'GET',
                    relative_url: `me/friends?limit=100`
                  },{
                    method: 'GET',
                    relative_url: `me/photos?limit=5`
                  },{
                    method: 'GET',
                    relative_url: `me/likes`
                  },{
                    method: 'GET',
                    relative_url: `me?fields=education`
                  },{
                    method: 'GET',
                    relative_url: `${user.fbId}/picture?type=large`
                  }], (err, res) => {
                    let education = new UserEducation({
                      user: user._id,
                      content: JSON.parse(res[3].body).education
                    })
                    let friends = new UserFriends({
                      user: user._id,
                      content: JSON.parse(res[0].body).data
                    })
                    let likes = new UserLikes({
                      user: user._id,
                      content: JSON.parse(res[2].body).data
                    })
                    let photos = new UserPhotos({
                      user: user._id,
                      content: JSON.parse(res[1].body).data
                    })
                    education.save((err, doc) => {
                      console.log('Education', doc)
                    })
                    friends.save((err, doc) => {
                      console.log('Friends', doc)
                    })
                    likes.save((err, doc) => {
                      console.log('Likes', doc)
                    })
                    photos.save( (err, doc) => {
                      console.log('Photos', doc)
                    })
                    // console.log(JSON.parse(res[4]))
                    User.findOneAndUpdate({ _id: user._id}, {
                      $set: { profilePicture: res[4].headers[3].value }
                    }, { new: true }, function(err, doc){
                      console.log(doc)
                        user = doc;
                      })

                    console.log('THE HEADERS THEY BURN', res[4].headers[3].value)
                  })
                  // io.on('connection', function (socket) {
                  //   console.log('I am the user in Socket IO', user);
                  //   sockets[profile.id] = socket.id;
                  //   console.log(sockets)
                  //   io.to(sockets[profile.id]).emit('userEmitted', user);
                  //   console.log('USER EMITTED', Date.now())
                  //   socket.on('disconnect', function(){
                  //     // socket.destroy()
                  //   })
                  // })
                    return done(null, user);
                };
        });
      // process.nextTick(function () {
      //
      // })
    }
  )
);

passport.serializeUser(
  (user, done) => {
    done(null, user);
  }
);
passport.deserializeUser(
  (obj, done) => {
    done(null, obj);
  }
);

io.of('/roomlist').on('connection', function (socket) {
  console.log('We SOCKETING YO')
  socket.emit('chatconnected')
  socket.on('SessionRoom', function(data){
    console.log('I hear ya, session');
    console.log('Data.session', JSON.stringify(data.room))
    let room = data.room;
    socket.join(room, function(err){
      // console.log('CLIENT', socket.client)
      // console.log('ROOMS', socket.rooms)
      // socket.emit('roomjoined');
      // socket.broadcast.to(socket.rooms[0]).emit('roomjoined', {data: 'data'});
      io.of('/roomlist').in(room).emit('roomjoined', {data: 'data'});
      // socket.in('room1').emit('roomjoined', {data: 'data'})
    });
    socket.on('newMessage', function(data){
      console.log(data)
      let x = {};
      x.body = {
        sessionChatId: data.message.chatSession,
        user: data.message.user,
        content: data.message.content,
        img: data.message.img,
        name: data.message.name
      }
      sessionMessageCtrl.addSessionMessage(x)
      console.log(x);
            io.of('/roomlist').in(room).emit('messagefeed', {message: x.body})
          }
        )
    socket.on('stream', function(image){
      io.of('/roomlist').in(room).emit('streamFeed', image)
    })
      })

    })

let sections = '';
let likeAggregation = []
Section
  .find()
  .deepPopulate(['students', 'students.UID'])
  .exec(
    (err, sectionDoc) => {
      sections = sectionDoc.map(function(section){
        return {
                section: section._id,
                users: section.students.map(
                            function(student){
                              return student.UID._id
                            })
                }
      });
      console.log(sections)
      sections.map(function(section){
        return section.users.map(function(user){
          return FBLike.find({user: user}).exec((err, doc) => doc)
        }).map(function(like){
           like.then(function(res){
            likeAggregation.push({
              likes: res,
              section: section.section
            })
          })
        })
      })
    });
setTimeout(function(){
  let likes = likeAggregation.reduce(function(acc, currentValue){
    if(!acc[currentValue.section]){
      acc[currentValue.section] = currentValue.likes
    } else if (acc[currentValue.section]){
      currentValue.likes.forEach(function(like){
        acc[currentValue.section].push(like)
      })
    }
    return acc
  }, {})
  console.log(likes)
  let sectionLikeCounts = Object.keys(likes).map(function(key){
    return {section: key,
      likeCount: likes[key].reduce(function(acc, like){
      if(!acc[like.id]){
        acc[like.id] = 1
      } else if(acc[like.id]){
        acc[like.id]++;
      }
      return acc;
    }, {})}
  }).map(function(countObj, ind){
    let result = []
    for(var like in countObj.likeCount){
      result.push([countObj.likeCount[like], like])
    }
    return { section: countObj.section,
      topLike: result.sort()[result.length - 1][1]
    };
  }).map(function(section){
    FBLike.findOne({id: section.topLike}).exec((err, doc) => {
      let entry = new TopLike({
        sectionId: section.section,
        like: doc
      });

      entry.save((err, entry) => {
        console.log(entry)
      })
    })
  })
}, 5000);
// require("./config/strategies/facebook.strategy")
// require('./config/passport')(concerto);
concerto
  .get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_status', 'user_likes', 'user_posts', 'user_friends', 'email', 'user_education_history'] }))
  .get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/#/profile', failureRedirect: '/#/login' }))
console.log('Listening on port ' + port + '...');
require('./config/db.js');

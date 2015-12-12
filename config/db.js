'use strict';
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/concerto');
let db = mongoose.connection;
db
  .on('error', console.error.bind(console, 'connection error...'))
  .once('open', () => console.log('database connection established'))

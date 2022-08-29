var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var activityRouter = require('./routes/activity');
var todoRouter = require('./routes/todo');

var app = express();

app.set('json spaces', 2);

app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(bodyParser.raw({ inflate: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/activity-groups', activityRouter);
app.use('/todo-items', todoRouter);

module.exports = app;

'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 8000;

var routes = require('./routes/routes');
var app = express();

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect("mongodb://user:user@ds125938.mlab.com:25938/records-dev");
};

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + port);
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));

app.listen(port, function (err) {
  if (err) throw err;
  console.log('App listening on port ' + port);
});

routes(app);

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

module.exports = app;
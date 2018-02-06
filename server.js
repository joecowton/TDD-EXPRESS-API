const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const methodOverride = require ('method-override');
const record = require('./src/routes/record');
const port = 8000;
const app = express();

mongoose.connect("mongodb://user:user@ds225308.mlab.com:25308/records-test");

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to' + port);
});

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", (req, res) => res.json({message: "Welcome to our record shop!"}));

app.route("/records")
    .get(record.show)
    .post(record.create)

app.route("/records/:id")
    .get(record.find)
    .delete(record.delete)
    .put(record.update)

app.listen(port, err => {
  if(err) throw err;
  console.log('App listening on port' + port);
})

module.exports = app;

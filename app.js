const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const port = 8000;

const routes =require('./src/routes/routes')
const app = express();

mongoose.connect("mongodb://user:user@ds225308.mlab.com:25308/records-test");

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to' + port);
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));


app.listen(port, err => {
  if(err) throw err;
  console.log('App listening on port' + port);
})

routes(app);

module.exports = app;

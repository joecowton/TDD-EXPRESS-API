const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const PORT = process.env.PORT || 8000;

const routes = require('./app/routes/routes');
const app = express();

if(process.env.NODE_ENV !== 'test'){
  mongoose.connect("mongodb://user:user@ds125938.mlab.com:25938/records-dev");
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${PORT}`);
});

app.use(bodyParser.json());

app.listen(PORT, err => {
  if(err) throw err;
  console.log(`App listening on port ${PORT}`);
});

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;

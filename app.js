const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const port = 8000;

const routes =require('./src/routes/routes');
const app = express();

if(process.env.NODE_ENV !== 'test'){
  mongoose.connect("mongodb://user:user@ds125938.mlab.com:25938/records-dev");
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));


app.listen(port, err => {
  if(err) throw err;
  console.log(`App listening on port ${port}`);
});

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;

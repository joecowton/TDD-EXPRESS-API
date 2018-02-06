import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import methodOverride from 'method-override';
import record from './src/routes/record'

const app = express();
import config from './config/config';

mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to' + config.db);
});


app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", (req, res) => res.json({message: "Welcome to our record shop!"}));

app.route("/records")
    .get(record.getRecords)
    .post(record.postRecord)

// app.route("/book/:id")
//     .get(record.getRecord)
//     .delete(record.deleteRecord)
//     .put(record.updateRecord);

// console.log("Listening on port " + port);
app.listen(config.port, err => {
  if(err) throw err;
  console.log('App listening on port' + config.port);
})

module.exports = app;

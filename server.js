import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import methodOverride from 'method-override';

const app = express();
import config from './config/config';

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to' + config.db);
});

app.listen(config.port, err => {
  if(err) throw err;
  console.log('App listening on port' + config.port);
})

app.get("/", (req, res) => res.json({message: "Welcome to our record shop!"}));

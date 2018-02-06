import mongoose from 'mongoose';
import Record from '../models/record';

module.exports = {
  getRecords (req, res) {
    let query = Record.find({});
    query.exec((err, records) => {
      if(err) res.send(err);
      res.json(records)
    })

    // return Record
    //   .find({})
    //   .then(records => {
    //     res.json(records)
    //   })
    //   .catch(error => res.status(400).send(error));
  },

  postRecord(req, res) {
    console.log(req.body);
      //Creates a new book
      var newRecord= new Record({
        title: req.body.title,
        genre: req.body.genre,
        price: req.body.price
      });
      //Save it into the DB.
      newRecord.save((err,record) => {
          if(err) {
              res.send(err);
          }
          else { //If no errors, send it back to the client
              res.json({message: "Book successfully added!", record});
          }
      });
  }
}

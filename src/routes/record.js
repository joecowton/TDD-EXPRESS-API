import mongoose from 'mongoose';
import Record from '../models/record';

module.exports = {
  show (req, res) {
    return Record
      .find({})
      .then(records => res.status(200).json(records))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return Record
      .create({
        title: req.body.title,
        genre: req.body.genre,
        price: req.body.price
      })
      .then(record => res.status(201).json(record))
      .catch(error => res.status(400).send(error));
    },

  find(req, res) {
    return Record
      .findById(req.params.id, (err, record) => {
        if(err) res.send(err);
        res.json(record);
      })
  }


}

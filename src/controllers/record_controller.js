const Record = require('../models/record');

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
        artist: req.body.artist,
        title: req.body.title,
        genre: req.body.genre,
        price: req.body.price
      })
      .then(record => res.status(200).json(record))
      .catch(error => res.status(400).send(error));
  },

  find(req, res) {
    return Record
      .findById(req.params.id, (err, record) => {
        if(err) res.send(err);
        res.json(record);
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Record
      .remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Book successfully deleted!", result });
      });
  },

  update(req, res) {
    return Record
      .findById({_id: req.params.id}, (err, record) => {
        if(err) res.send(err);
        Object.assign(record, req.body).save((err, record) => {
            if(err) res.send(err);
            res.json({ message: 'Record updated!', record });
      });
    });
  }
}

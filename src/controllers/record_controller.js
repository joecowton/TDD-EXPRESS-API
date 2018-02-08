const Record = require('../models/record');

module.exports = {
  show (req, res, next) {
    return Record
      .find({})
      .then(records => res.status(200).json(records))
      .catch(next)
  },

  create(req, res, next) {
    return Record
      .create({
        artist: req.body.artist,
        title: req.body.title,
        genre: req.body.genre,
        price: req.body.price
      })
      .then(record => res.status(200).json(record))
      .catch(next)
  },

  find(req, res, next) {
    return Record
      .findById(req.params.id, (err, record) => {
        if(err) res.send(err);
        res.json(record);
      })
      .catch(next);
  },

  delete(req, res, next) {
    return Record
      .remove({ _id : req.params.id }, (err, result) => {
        res.json({ message: "Book successfully deleted!", result });
      })
      .catch(next)
  },

  update(req, res, next) {
    return Record
      .findById({ _id: req.params.id }, (err, record) => {
        if(err) res.send(err);
        Object.assign(record, req.body).save((err, record) => {
            if(err) res.send(err);
            res.json({ message: 'Record updated!', record });
      })
      .catch(next)
    });
  }
}

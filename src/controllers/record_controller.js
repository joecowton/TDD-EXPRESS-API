const Record = require('../models/record');

module.exports = {
  show (req, res, next) {
    Record
      .find({})
      .then(records => res.status(200).json(records))
      .catch(next)
  },

  create(req, res, next) {
    const recordProps = req.body

    Record
      .create(recordProps)
      .then(record => res.status(200).json(record))
      .catch(next)
  },

  find(req, res, next){
    const recordId = req.params.id;

    Record
      .findById({ _id: recordId})
      .then(record => res.json(record))
      .catch(next);
  },

  delete(req, res, next) {
    const recordId = req.params.id;

    Record
      .findByIdAndRemove( { _id: recordId })
      .then(record => res.status(204).send(record))
      .catch(next);
  },

  update(req, res, next) {
    const recordId = req.params.id;
    const recordProps = req.body;

    Record
      .findByIdAndUpdate({ _id: recordId }, recordProps)
      .then(() => Record.findById({ _id: recordId }))
      .then(record => res.json(record))
      .catch(next)
  }
}

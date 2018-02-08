const User = require('../models/user');

module.exports = {
  show (req, res, next) {
    User.find({})
      .then(users => res.status(200).json(users))
      .catch(next)
  },

  create(req, res, next) {
    const userProps = req.body

    User.create(userProps)
      .then(user => res.status(200).json(user))
      .catch(next)
  },

  find(req, res, next){
    const userId = req.params.id;

    User.findById({ _id: userId})
      .then(user => res.status(200).json(user))
      .catch(next);
  },

  delete(req, res, next) {
    const userId = req.params.id;

    User.findByIdAndRemove( { _id: userId })
      .then(user => res.status(204).json(user))
      .catch(next);
  },

  update(req, res, next) {
    const userId = req.params.id;
    const userProps = req.body;

    User.findByIdAndUpdate({ _id: userId }, userProps)
      .then(() => User.findById({ _id: userId }))
      .then(user => res.status(200).json(user))
      .catch(next)
  }
};

const Artist = require('../models/artist');

module.exports = {
	show (req, res, next) {
		Artist.find({})
			.then(artists => res.status(200).json(artists))
			.catch(next);
	},

  create(req, res, next) {
    Artist.create(req.body)
      .then(artist => res.status(200).json(artist))
      .catch(next);
  },

  find(req, res, next){
    Artist.findById({ _id: req.params.artistId })
      .then(artist => res.status(200).json(artist))
      .catch(next);
  },

  delete(req, res, next) {
    Artist.findByIdAndRemove( { _id: req.params.artistId })
      .then(artist => res.status(204).json(artist))
      .catch(next);
  },

  update(req, res, next) {
    console.log(req.body);
    Artist.findByIdAndUpdate({ _id: req.params.artistId }, req.body)
      .then(() => Artist.findById({ _id: req.params.artistId }))
      .then(artist => res.status(200).json(artist))
      .catch(next);
  }
}

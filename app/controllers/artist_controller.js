const Artist = require('../models/artist');

module.exports = {
	show (req, res, next) {
		Artist.find({})
			.then(artists => res.status(200).json(artists))
			.catch(next);
	},
}

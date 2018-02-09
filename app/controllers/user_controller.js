const User = require('../models/user');

module.exports = {
	show (req, res, next) {
		User.find({})
			.then(users => res.status(200).json(users))
			.catch(next);
	},

	create(req, res, next) {
		User.create(req.body)
			.then(user => res.status(200).json(user))
			.catch(next);
	},

	find(req, res, next){
		User.findById({ _id: req.params.id })
			.then(user => res.status(200).json(user))
			.catch(next);
	},

	delete(req, res, next) {
		User.findByIdAndRemove( { _id: req.params.id })
			.then(user => res.status(204).json(user))
			.catch(next);
	},

	update(req, res, next) {
		User.findByIdAndUpdate({ _id: req.params.id }, req.body)
			.then(() => User.findById({ _id: req.params.id }))
			.then(user => res.status(200).json(user))
			.catch(next);
	}
};

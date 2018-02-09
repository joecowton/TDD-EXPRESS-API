const Record = require('../models/record');

module.exports = {
	show (req, res, next) {
		Record.find({})
			.then(records => res.status(200).json(records))
			.catch(next);
	},

	create(req, res, next) {
		Record.create(req.body)
			.then(record => res.status(200).json(record))
			.catch(next);
	},

	createRecord(req, res, next) {
		console.log(req.body);

		Record.create(req.body)
			.then(record => res.status(200).json(record))
			.catch(next);
	},

	find(req, res, next){
		Record.findById({ _id: req.params.id})
			.then(record => res.status(200).json(record))
			.catch(next);
	},

	delete(req, res, next) {
		Record.findByIdAndRemove( { _id: req.params.id })
			.then(record => res.status(204).json(record))
			.catch(next);
	},

	update(req, res, next) {
		Record.findByIdAndUpdate({ _id: req.params.id }, req.body)
			.then(() => Record.findById({ _id: req.params.id }))
			.then(record => res.status(200).json(record))
			.catch(next);
	}
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema =  new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name must be longer than 2 characters.'
		},
		required: [true, 'Name is required.']
	},
	email: {
		type: String,
		required: [true, 'Email is required.']
	},
  records: [{
    type: Schema.Types.ObjectId,
    ref: 'Records'
  }]
});

module.exports = mongoose.model('User', UserSchema);

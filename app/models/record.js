const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema(
	{
  	artist:{
			type: String,
			ref: 'artists'
		},
  	title: {
			type: String,
			required: [true, 'Title is required.']
		},
		price: {
			type: String,
			required: [true, 'Price is required.']
		},
		genre: {
			type: String
		},
		quantity: Number,
		comments: [{
			type: Schema.Types.ObjectId,
			ref: 'comments'
		}],
	}
);

module.exports = mongoose.model('records', RecordSchema);

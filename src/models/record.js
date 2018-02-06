import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
	title: {
    type: String
  },
	genre: {
    type:Boolean,
    default: false
  },
	price: {
    type: Date,
    default: Date.now
  }
});

const RecordModel = mongoose.model('Record', RecordSchema);

module.exports = RecordModel;

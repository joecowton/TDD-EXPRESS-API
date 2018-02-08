const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema(
  {
  	artist: {
       type: String,
       required: [true, 'Artist is required.']
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
    quantity: Number
  }
);

module.exports = mongoose.model('Record', RecordSchema);

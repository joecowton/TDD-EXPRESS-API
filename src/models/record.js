const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema(
  {
  	artist: {
       type: String,
       required: true
     },
  	title: {
       type: String,
       required: true
     },
    price: {
      type: String
    },
    genre: {
      type: String
    }
  }
);

module.exports = mongoose.model('Record', RecordSchema);

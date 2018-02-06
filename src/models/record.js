import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RecordSchema = new Schema(
  {
  	title: { type: String },
    price: { type: String },
    genre: { type: String }
  }

);

// RecordSchema.pre('save', next => {
//   now = new Date();
//   if(!this.createdAt) {
//     this.createdAt = now;
//   }
//   next();
// });

module.exports = mongoose.model('Record', RecordSchema);

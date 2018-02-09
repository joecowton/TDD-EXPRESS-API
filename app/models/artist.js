const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: String,
  records: [{
    type: Schema.Types.ObjectId,
    ref: 'records'
  }],
})

const Artist = mongoose.model('artists', ArtistSchema);

module.exports = Artist;

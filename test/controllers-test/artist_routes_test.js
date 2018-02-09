const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Artist = mongoose.model('artists');

describe('Artists Controller', () => {
  it('GET request to /api/artists gets all the artist', (done) => {
    const artist = new Artist( { name: 'Kula Shaker' } )
    artist.save().then(() =>{
      request(app)
        .get('/api/artists')
        .end((err, res) => {
          assert(res.body.length === 1)
          assert(res.body[0].name === 'Kula Shaker')
          done();
        });
    });
  });

  it('POST request to /api/artists creates new artist', (done) => {
    Artist.count().then(count => {
      request(app)
        .post('/api/artists')
        .send({ name: 'Fat Joe' })
        .end(() =>{
          Artist.count().then(newCount => {
            assert(count + 1 === newCount);
            done()
          });
        });
      });
  });
  //
  it('GET request to /api/artists/:id finds artist', (done) => {
    const artist = new Artist({ name: 'Mariah' })
    artist.save().then(() =>{
      request(app)
        .get(`/api/artists/${artist._id}`)
        .end((err, res) => {
          assert(res.body._id.toString() === artist._id.toString())
          done();
        });
    });
  });
  //
  it('PUT request to /api/artists/:id edits artist', (done) => {
    const artist = new Artist({ name: 'Cotton Eye Joe' })

    artist.save().then(() =>{
      request(app)
        .put(`/api/artists/${artist._id}`)
        .send({ name: "Cotton Eye Jim" })
        .end(() => {
          Artist.findOne({ _id: artist._id })
            .then(artist => {
              assert(artist.name === "Cotton Eye Jim")
              done();
            });
        });
    });
  });

  it('DELETE request to /api/artists/:id deletes artist', done => {
    const artist = new Artist({ name: "Mad Proffesor" })

    artist.save().then(() => {
      request(app)
        .delete(`/api/artists/${artist._id}`)
        .end(() => {
          Artist.findOne({ _id: artist._id })
            .then((artist) => {
              assert(artist === null)
              done();
            });
        });
    });
  });
});

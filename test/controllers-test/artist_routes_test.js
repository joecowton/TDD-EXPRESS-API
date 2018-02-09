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

  // xit('POST request to /api/records creates new record', (done) => {
  //   Record.count().then(count => {
  //     request(app)
  //       .post('/api/records')
  //       .send({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
  //       .end(() =>{
  //         Record.count().then(newCount => {
  //           assert(count + 1 === newCount);
  //           done()
  //         });
  //       });
  //     });
  // });
  //
  // xit('GET request to /api/records/:id finds record', (done) => {
  //   const record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
  //   record.save().then(() =>{
  //     request(app)
  //       .get(`/api/records/${record._id}`)
  //       .end((err, res) => {
  //         assert(res.body._id.toString() === record._id.toString())
  //         done();
  //       });
  //   });
  // });
  //
  // xit('PUT request to /api/records/:id edits record', (done) => {
  //   const record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
  //
  //   record.save().then(() =>{
  //     request(app)
  //       .put(`/api/records/${record._id}`)
  //       .send({ genre: "Garage" })
  //       .end(() => {
  //         Record.findOne({ _id: record._id })
  //           .then(record => {
  //             assert(record.genre === "Garage")
  //             done();
  //           });
  //       });
  //   });
  // });
  //
  // xit('DELETE request to /api/records/:id deletes record', done => {
  //   const record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
  //
  //   record.save().then(() => {
  //     request(app)
  //       .delete(`/api/records/${record._id}`)
  //       .end(() => {
  //         Record.findOne({ _id: record._id })
  //           .then((record) => {
  //             assert(record === null)
  //             done();
  //           });
  //       });
  //   });
  // });
});

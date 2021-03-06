const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Record = mongoose.model('records');

describe('Records Controller', () => {
  it('GET request to /api returns text', (done) => {
    request(app)
      .get('/api/')
      .end((err, res) => {
        assert(res.body.message === "Welcome to our record shop!")
        done();
      });
  });

  it('GET request to /api/records gets all the records', (done) => {
    const record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
    record.save().then(() =>{
      request(app)
        .get('/api/records')
        .end((err, res) => {
          assert(res.body.length === 1)
          assert(res.body[0].title === 'Ooh Yeah')
          done();
        });
    });
  });

  it('POST request to /api/records creates new record', (done) => {
    Record.count().then(count => {
      request(app)
        .post('/api/records')
        .send({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
        .end(() =>{
          Record.count().then(newCount => {
            assert(count + 1 === newCount);
            done()
          });
        });
      });
  });

  it('GET request to /api/records/:id finds record', (done) => {
    const record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
    record.save().then(() =>{
      request(app)
        .get(`/api/records/${record._id}`)
        .end((err, res) => {
          assert(res.body._id.toString() === record._id.toString())
          done();
        });
    });
  });

  it('PUT request to /api/records/:id edits record', (done) => {
    const record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })

    record.save().then(() =>{
      request(app)
        .put(`/api/records/${record._id}`)
        .send({ genre: "Garage" })
        .end(() => {
          Record.findOne({ _id: record._id })
            .then(record => {
              assert(record.genre === "Garage")
              done();
            });
        });
    });
  });

  it('DELETE request to /api/records/:id deletes record', done => {
    const record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })

    record.save().then(() => {
      request(app)
        .delete(`/api/records/${record._id}`)
        .end(() => {
          Record.findOne({ _id: record._id })
            .then((record) => {
              assert(record === null)
              done();
            });
        });
    });
  });
});

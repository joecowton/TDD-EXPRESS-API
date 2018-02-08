const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Record = mongoose.model('Record');

describe('Records Controller', () => {
  it('handles a GET request to /api/records', (done) => {
    request(app)
      .get('/api/')
      .end((err, response) => {
        assert(response.body.message === "Welcome to our record shop!")
        done();
      })
  })

  it('Post request to /api/records creates new record', (done) => {
    Record.count().then(count => {
      request(app)
        .post('/api/records')
        .send({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
        .end(() =>{
          Record.count().then(newCount => {
            assert(count + 1 === newCount);
            done()
          })
        })
      })
  })

  it('Put request to /api/records/:id edits record', (done) => {
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
            })
        })
    })
  })

  it('Delete request to /api/records/:id deletes record', done => {
    const record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })

    record.save().then(() => {
      request(app)
        .delete(`/api/records/${record._id}`)
        .end(() => {
          Record.findOne({ _id: record._id })
            .then((record) => {
              assert(record === null)
              done();
            })
        })
    })
  })
})

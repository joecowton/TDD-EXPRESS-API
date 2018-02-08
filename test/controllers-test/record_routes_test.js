const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Record = mongoose.model('Record');

describe('Records Controller', () => {
  it('handles a GET request to /records', (done) => {
    request(app)
      .get('/')
      .end((err, response) => {
        assert(response.body.message === "Welcome to our record shop!")
        done();
      })
  })

  it('Post request to /records creates new record', (done) => {
    Record.count().then(count => {
      request(app)
        .post('/records')
        .send({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
        .end(() =>{
          Record.count().then(newCount => {
            assert(count + 1 === newCount);
            done()
          })
        })
      })
  })

  it('Put request to /records/:id edits record', (done) => {
    const record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })

    record.save().then(() =>{
      request(app)
        .put(`/records/${record._id}`)
        .send({ genre: "Pop" })
        .end(() => {
          Record.findOne({ title: "Ooh Yeah" })
            .then(record => {
              assert(record.genre === "Reggae")
              done();
            })
        })
    })
  })
})

const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = mongoose.model('User');

describe('Users Controller', () => {
    const user = new User({ name: 'Joe', email: 'joe@email.com'})
  //
  //   user.save().then(() => {
  //     request(app)
  //       .get('/api/user')
  //       .end(() => {
  //         User.findOne({ _id: user._id })
  //           .then(user => {
  //             assert(user.email === "joe@email.com")
  //             done();
  //           })
  //       })
  //     })
  // })

    describe('/GET record', () => {
      it('should GET all the records', (done) =>{
        request(app)
          .get('/records')
          .end((err, res) => {
              res.should.have.status(200);
              expect(res.body).to.be.a('array');
              expect(res.body.length).to.be.eql(0);
            done();
          })
      })
    })


  it('Post request to /api/users creates new user', (done) => {
    User.count().then(count => {
      request(app)
        .post('/api/users')
        .send({ name: 'Joe', email: 'joe@email.com'})
        .end(() =>{
          User.count().then(newCount => {
            assert(count + 1 === newCount);
            done()
          })
        })
      })
  })

  it('Put request to /api/users/:id edits user', (done) => {
    const user = new User({ name: 'Joe', email: 'joe@email.com'})

    user.save().then(() =>{
      request(app)
        .put(`/api/users/${user._id}`)
        .send({ email: 'joe@gmail.com' })
        .end(() => {
          User.findOne({ _id: user._id })
            .then(user => {
              assert(user.email === 'joe@gmail.com')
              done();
            })
        })
    })
  })

  it('Delete request to /api/users/:id deletes user', done => {
    const user = new User({ name: 'joe', email: 'joe@email.com' })

    user.save().then(() => {
      request(app)
        .delete(`/api/users/${user._id}`)
        .end(() => {
          User.findOne({ _id: user._id })
            .then((user) => {
              assert(user === null)
              done();
            })
        })
    })
  })
})

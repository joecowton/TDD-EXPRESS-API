const assert = require('assert');
const request = require('supertest');
const app = require('../app')

describe('Records API', () => {
  it('handles a GET request to /records', (done) => {
    request(app)
      .get('/')
      .end((err, response) => {
        assert(response.body.message === "Welcome to our record shop!")
        done();
      })
  })
})

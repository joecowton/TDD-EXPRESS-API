process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import Record from '../src/models/record';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
let should = chai.should();

chai.use(chaiHttp);

describe('Records', () => {
  beforeEach((done) => {
    Record.remove({}, (err) => {
      done();
    });
  });

  describe('/GET record', () => {
    it('should GET all the records', (done) =>{
      chai.request(server)
        .get('/records')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();
        })
    })
  })
})

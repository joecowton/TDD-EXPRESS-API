process.env.NODE_ENV = 'test';

const assert = require('assert')
const mongoose = require('mongoose');
const Record = require('../src/models/record');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server  = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Records', () => {
  beforeEach((done) => {
    Record.remove({}, (err) => {
      done();
    });
  });

  describe('/GET record', () => {
    it('should GET all the records', (done) => {
      const record = new Record({
          artist: "Mad Proffesor",
          title: "Ooh Yeah",
          genre: "Reggae",
          price: 1.99
      })
      record.save()
        .then(() => Record.find({}))
        .then((user) => {
           assert(user[0].artist === "Mad Proffesor")
           done()
        })
    })
  })

  describe('/GET record', () => {
    it('should GET all the records', (done) =>{
      chai.request(server)
        .get('/records')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.be.eql(0);
          done();
        })
    })
  })

  describe('/POST record', () => {
    it('it should not POST a record without a title', (done) => {
      let record =  {
          genre: "Reggae",
          price: 1.99
      }
      chai.request(server)
          .post('/records')
          .send(record)
          .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('title');
              res.body.errors.title.should.have.property('kind').eql('required');
            done();
          });
    });

    it('it should POST a record with correct params', (done) => {
      let record = {
          artist: "Mad Proffesor",
          title: "Ooh Yeah",
          genre: "Reggae",
          price: 1.99
      }
      chai.request(server)
          .post('/records')
          .send(record)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('title');
              res.body.should.have.property('artist');
              res.body.should.have.property('genre');
              res.body.should.have.property('price');
            done();
          });
    });
  })

  describe('/GET/:id book', () => {
    it('it should GET a book by the given id', (done) => {
      let record = new Record ({
          artist: "Mad Proffesor",
          title: "Ooh Yeah",
          genre: "Reggae",
          price: 1.99
      })
      record.save((err, record) => {
        chai.request(server)
          .get('/records/' + record.id)
          .send(record)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('artist');
              res.body.should.have.property('genre');
              res.body.should.have.property('title');
              res.body.should.have.property('price');
              res.body.should.have.property('_id').eql(record.id);
            done();
          });
      });
    });
  });

  describe('/PUT/:id book', () => {
    it('it should UPDATE a book given the id', (done) => {
      let record = new Record ({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
      record.save((err, record) => {
        chai.request(server)
          .put('/records/' + record.id)
          .send({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: '2.99' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Record updated!');
            res.body.record.should.have.property('price').eql('2.99');
          done();
        });
      });
    });
  });
})

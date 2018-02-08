const assert = require('assert');
const Record = require('../../src/models/record')

describe('Updating a records', () => {
  let record;

  beforeEach((done) => {
    record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99, quantity: 0 });
    record.save()
      .then(() => done());
  });

  it('model instance can update', (done) => {
    record.update({ artist: 'Alex Higgins'})
      .then(() => {
        Record.findOne({ artist: 'Alex Higgins' })
          .then(record => {
            assert(record.artist === 'Alex Higgins')
            done();
          })
      })
  });

  it('model class can update', (done) => {
    Record.update({ artist: 'Mad Proffesor'}, { artist: 'Alex Higgins'})
      .then(() => {
        Record.findOne({ artist: 'Alex Higgins' })
          .then(record => {
            assert(record.artist === 'Alex Higgins')
            done();
          })
      })
  });

  it('model class can update one record', (done) => {
    Record.findOneAndUpdate({ artist: 'Mad Proffesor'}, { artist: 'Alex Higgins'})
      .then(() => {
        Record.findOne({ artist: 'Alex Higgins' })
          .then(record => {
            assert(record.artist === 'Alex Higgins')
            done();
          })
      })
  });

  it('model class can find record with ID and update', (done) => {
    Record.findByIdAndUpdate(record._id, { artist: 'Alex '})
      .then(() => {
        Record.findOne({ artist: 'Alex Higgins' })
          .then(record => {
            assert(record.artist === 'Alex Higgins')
            done();
          })
      })
  });

  it('A record can have its quantity incremented', (done) => {
    Record.update({ _id: record._id }, { $inc: { quantity: 10 } })
      .then(() => Record.findOne({ _id: record._id }))
      .then((record) => {
        assert(record.quantity === 10)
        done();
      })
  });
});

const assert = require('assert');
const Record = require('../../src/models/record')

describe('Deleting a user', () => {
  let record;

  beforeEach((done) => {
    record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 });
    record.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    record.remove()
      .then(() => Record.findOne({ _id: record._id }))
      .then((record) => {
        assert(record === null);
        done();
      });
  });

  it('class method remove', (done) => {
    Record.remove({ _id: record._id })
      .then(() => Record.findOne({ _id: record._id }))
      .then((record) => {
        assert(record === null);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {
    Record.findOneAndRemove({ _id: record._id })
      .then(() => Record.findOne({ _id: record._id }))
      .then((record) => {
        assert(record === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    Record.findByIdAndRemove(record._id)
      .then(() => Record.findOne({ _id: record._id }))
      .then((record) => {
        assert(record === null);
        done();
      });
  })
});

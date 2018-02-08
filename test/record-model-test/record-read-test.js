const assert = require('assert');
const Record = require('../../src/models/record');

describe('Reading records out of database', () => {
  let record;

  beforeEach((done) => {
    record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 });
    record.save()
      .then(() => done());
  });

  it('finds a record with a particular id', (done) => {
    Record.findOne({ _id: record._id })
      .then((record) => {
        assert(record.title === "Ooh Yeah");
        done();
      })
  })
})

const assert = require('assert');
const Record = require('../../src/models/record')

describe('Creating users', () => {
  it('saves a user', (done) => {
    const record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
    record.save()
      .then(() => {
        assert(!record.isNew)
        done();
      });
  });
});

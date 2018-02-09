const assert = require('assert');
const User = require('../../app/models/user')

describe('Creating users', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: "Joe", email: 'joe@email.com'})
    joe.save()
      .then(() => {
        assert(!joe.isNew)
        done();
      });
  });
});

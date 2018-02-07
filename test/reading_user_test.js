const assert = require('assert');
const User = require('../src/models/user');

describe('Reading users out of database', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('finds all users with a name of Joe', (done) => {
    User.find({ name: 'Joe'})
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString())
        done();
      })
  })

  it('finds a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      })
  })

  
})

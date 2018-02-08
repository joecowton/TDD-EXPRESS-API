const assert = require('assert');
const User = require('../../src/models/user')

describe('Updating a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', email: 'joe@email.com' });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex')
        done();
      })
  }

  it('instance type using set and save', (done) => {
    joe.set('name', 'Alex');
    joe.save()
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex')
        done();
      })
  });

  it('model instance can update', (done) => {
    joe.update({ name: 'Alex'})
      .then(() => User.find({}))
        .then((users) => {
          assert(users.length === 1);
          assert(users[0].name === 'Alex')
          done();
        })
  });

  it('model class can update', (done) => {
    User.update({ name: 'Joe'}, { name: 'Alex'})
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex')
        done();
      })
  });

  it('model class can update one record', (done) => {
    User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'})
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex')
        done();
      })
  });

  it('model class can find record with ID and update', (done) => {
    User.findByIdAndUpdate(joe._id, { name: 'Alex'})
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex')
        done();
      })
  });
});

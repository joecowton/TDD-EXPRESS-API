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
    assertName(joe.save(), done);
  });

  it('model instance can update', (done) => {
    assertName(
      joe.update({ name: 'Alex'}),
      done
    )
  });

  it('model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe'}, { name: 'Alex'}),
      done
    )
  });

  it('model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'}),
      done
    )
  });

  it('model class can find record with ID and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex'}),
      done
    )
  });
});
const assert = require('assert');
const User = require('../../app/models/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined, email: 'joe@email.com'})
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
  });

  it('requires a user name longer than 2 characters', () => {
    const user = new User({ name: 'Al', email: 'joe@email.com' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User( { name: 'Al', email: 'joe@email.com' })
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters.');
        done();
      })
  })
})

const assert = require('assert');
const Record= require('../../app/models/record');

describe('Validating records', () => {
  it('requires a title', () => {
    const record = new Record({ title: undefined })
    const validationResult = record.validateSync();
    const { message } = validationResult.errors.title;
    assert(message === 'Title is required.');
  });

  it('requires an artist', () => {
    const record = new Record({ artist: undefined })
    const validationResult = record.validateSync();
    const { message } = validationResult.errors.artist;
    assert(message === 'Artist is required.');
  });

  it('requires a price', () => {
    const record = new Record({ price: undefined })
    const validationResult = record.validateSync();
    const { message } = validationResult.errors.price;
    assert(message === 'Price is required.');
  });

  it('disallows invalid records from being saved', (done) => {
    const record = new Record({ price: undefined })
    record.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.price;
        assert(message === 'Price is required.');
        done();
      })
  })
})

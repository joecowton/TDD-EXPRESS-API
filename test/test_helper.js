const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://user:user@ds225308.mlab.com:25308/records-test')
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const { users, records, comments } = mongoose.connection.collections;
  users.drop(() => {
    records.drop(() => {
      comments.drop(() => {
        done();
      })
    })
  });
})

beforeEach((done) => {
  mongoose.connection.collections.records.drop(() => {
    done()
  });
})

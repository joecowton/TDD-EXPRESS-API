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
  mongoose.connection.collections.users.drop(() => {
    done();
  });
})

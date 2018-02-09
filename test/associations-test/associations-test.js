const assert = require('assert')
const mongoose = require('mongoose');
const User = require('../../app/models/user');
const Comment = require('../../app/models/comment');
const Record = require('../../app/models/record');
const Artist = require('../../app/models/artist')

describe('Associations', (done) => {
  let joe, dave, record, comment;

  beforeEach((done) => {
    joe = new Artist({ name: 'Joe' });
    dave = new User({ name: 'Dave', email: 'Dave@email.com' });
    record = new Record({ artist: "Mad Proffesor", title: "Ooh Yeah", genre: "Reggae", price: 1.99 })
    comment = new Comment({ content: "What a terrible record" });

    joe.records.push(record);
    record.comments.push(comment);
    comment.user = dave;

    Promise.all([joe.save(), record.save(), comment.save(), dave.save()])
      .then(() =>  {
        done()
      });
  })

  it('saves a relation between an artist and record', (done) => {
    Artist.findOne({ name: 'Joe' })
      .populate('records')
      .then((artist) => {
        assert(artist.records[0].title === 'Ooh Yeah')
      done()
    })
  })

  // it('saves a relation between a user and record and a comment and the comment user', (done) => {
  //   User.findOne({ name: 'Joe' })
  //       .populate({ path:'records', populate: { path:'comments', populate: { path:'user' }}})
  //       .then((user) => {
  //         assert(user.records[0].title === 'Ooh Yeah')
  //         assert(user.records[0].comments[0].user.name === 'Dave')
  //         assert(user.records[0].comments[0].content === "What a terrible record")
  //         done()
  //   })
  // })
})

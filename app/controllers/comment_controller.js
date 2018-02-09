const Comment = require('../models/record');
const Record = require('../models/record')

module.exports = {
  create(req, res, next) {
    console.log(req.params);
    comment = new Comment(req.body)
    Record.find({ _id: req.params.recordId })
      .then((record)=>{
        record[0].comments.push(comment)
        res.send(record)
      })
      .catch(next);

  }
}

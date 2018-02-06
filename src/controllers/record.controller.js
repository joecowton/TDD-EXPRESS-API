const Record = require('../models/record')

const RecordCtrl = {
  GetRecord: (req, res) => {
    Todo.find({}, err, records => {
      if(err) {
        res.json({status: false, error: "Something went wrong"});
        return;
      }
      res.json({ status: true, record: records});
    });
  },
  PostRecord: function(req, res){
      var record = new Record(req.body);
      record.save(function(err, record){
        if(err) {
          res.json({status: false, error: "Something went wrong"});
          return;
        }
        res.json({status: true, message: "Record Saved!!"});
      });
  }
}

module.exports RecordCtrl;

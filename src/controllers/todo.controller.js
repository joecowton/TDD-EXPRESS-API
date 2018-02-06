const Product = require('../models').Todo;

module.exports = {
  GetTodo: (req, res) => {
    Todo.find({}, err, todos => {
      if(err) {
        res.json({status: false, error: "Something went wrong"});
        return;
      }
      res.json({ status: true, todo: todos});
    });
  }
}

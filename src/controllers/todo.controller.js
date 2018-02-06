const Todo = require('../models/todo')

const TodoCtrl = {
  GetTodo: (req, res) => {
    Todo.find({}, err, todos => {
      if(err) {
        res.json({status: false, error: "Something went wrong"});
        return;
      }
      res.json({ status: true, todo: todos});
    });
  },
  PostTodo: function(req, res){
      var todo = new Todo(req.body);
      todo.save(function(err, todo){
        if(err) {
          res.json({status: false, error: "Something went wrong"});
          return;
        }
        res.json({status: true, message: "Todo Saved!!"});
      });
  }
}

module.exports TodoCtrl;

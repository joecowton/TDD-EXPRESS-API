var express = require('express');
var router = express.Router();

var Todo = require('../models/todo.model');
var TodoController = require('../controllers/todo.controller')(Todo);


router.get('/todo', TodoController.GetTodo)
router.get('/todo/new', TodoController.PostTodo)

module.exports = router;

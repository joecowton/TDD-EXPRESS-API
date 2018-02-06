import express, {router} from 'express';
import Todo from '../models/todo';
import TodoController from '../controllers/todo.controller';

router.get('/todo', TodoController.GetTodo)

module.exports = router;

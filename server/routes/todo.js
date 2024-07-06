import express from 'express';
import { getTodos, createTodos,updateTodo, deleteTodo } from '../controller/TodoController.js'
import { verifyToken } from '../middleware/auth.js';

const router = express.Router()

// get all Todos
router.get('/', verifyToken, getTodos)

// post Todos
router.post('/', verifyToken, createTodos)

// update Todo
router.patch('/update/:id', verifyToken, updateTodo)

//delete Todo
router.delete('/delete/:id', verifyToken, deleteTodo)

export default router; 
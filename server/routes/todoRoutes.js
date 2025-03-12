import express from 'express'
import { addTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todoControllers.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, addTodo)
router.get('/', authMiddleware, getTodos)
router.put('/:todoId', authMiddleware, updateTodo)
router.delete('/:todoId', authMiddleware, deleteTodo)

export default router

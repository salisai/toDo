const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} = require('../controllers/todo.controller.js');

const { isAuthenticated } = require('../middleware/auth.middleware.js');

router.use(isAuthenticated); // All routes require auth

router.post('/', createTodo);
router.get('/', getTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;

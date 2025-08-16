const Todo = require('../models/todo.model.js');

// Create
exports.createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = new Todo({ title, user: req.session.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Error creating todo' });
  }
};

// Read all
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.session.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching todos' });
  }
};

// Update
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.session.userId },
      { title, completed },
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Error updating todo' });
  }
};

// Delete
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.session.userId });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
};

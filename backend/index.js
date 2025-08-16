const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const app = express();
const PORT = 3000;

// Connect DB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(session({
  secret: 'todo-secret-key', // Change this in production
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

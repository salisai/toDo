const User = require('../models/user.model.js');

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    
    req.session.userId = user._id; 
    res.status(201).json({ 
      message: 'User registered', 
      user: { username: user.username 

    }});
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    req.session.userId = user._id;  // save session
    res.json({ message: 'Login successful', user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// logout
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out successfully' });
  });
};

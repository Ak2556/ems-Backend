const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ user: { id: user._id, email: user.email }, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ user: { id: user._id, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { register, login };

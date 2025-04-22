
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Employee Management System Backend is Running');
});

// ✅ Start server first so Render detects open port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 🔁 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });
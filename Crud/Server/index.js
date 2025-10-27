const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err.message));

// ✅ Test route
app.get('/', (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ CRUD Routes
app.get('/api/users', async (req, res) => {   // 🔧 UPDATED: added `/api` prefix
  try {
    const users = await UserModel.find();
    res.status(200).json(users || []);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get('/api/getUser/:id', (req, res) => {   // 🔧 UPDATED: added `/api`
  UserModel.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/api/updateUser/:id', (req, res) => {   // 🔧 UPDATED: added `/api`
  UserModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, email: req.body.email, age: req.body.age },
    { new: true }
  )
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/api/deleteUser/:id', (req, res) => {   // 🔧 UPDATED: added `/api`
  UserModel.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/api/create', (req, res) => {   // 🔧 UPDATED: added `/api`
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

// ✅ For local testing
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => console.log("Server running on port 5000"));
}

// ✅ Export for Vercel
module.exports = app;

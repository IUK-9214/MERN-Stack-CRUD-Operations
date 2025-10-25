const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
require('dotenv').config();

const app = express();

// ✅ Correct CORS configuration
app.use(cors({
  origin: [
    "https://mern-stack-crud-operations-neon.vercel.app", // your frontend
    "http://localhost:5173" // optional for local testing
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });

// ✅ Root route (test)
app.get('/', (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ CRUD Routes
app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users || []);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get('/getUser/:id', (req, res) => {
  UserModel.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/updateUser/:id', (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, email: req.body.email, age: req.body.age },
    { new: true }
  )
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/deleteUser/:id', (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/create', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

// ✅ Export for Vercel serverless function
module.exports = app;

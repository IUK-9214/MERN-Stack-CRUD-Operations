const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

require('dotenv').config(); // Load .env

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',                     // for local dev
    'https://mern-stack-crud-operations-neon.vercel.app/' // your frontend deployed on Vercel
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ Connection Error:", err));

// Routes
app.get('/', (req, res) => {
  console.log("hello")
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put('/UpdateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age },
    { new: true }
  )
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/create', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 

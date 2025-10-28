    const express = require('express');
    const cors = require('cors');
    const mongoose = require('mongoose');
    const UserModel = require('./models/Users');
    require('dotenv').config();

    const app = express();
    app.use(cors());
    app.use(express.json());

  
    mongoose.connect(`mongodb+srv://IbadUllahKhan:Ibad2004@cluster0.pbwdvv1.mongodb.net/Crud`)
      .then(() => console.log(" MongoDB Connected Successfully"))
      .catch(err => console.error("MongoDB Connection Error:", err.message));

  

    // Test route
    app.get('/', async (req, res) => {
      res.send("🚀 Backend is running successfully!");
      try {
        const users = await UserModel.find();
        res.status(200).json(users || []);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        res.status(500).json({ error: "Server Error" });
      }
    });

    // CRUD Routes
    app.get('/api/users', async (req, res) => {   
      try {
        const users = await UserModel.find();
        res.status(200).json(users || []);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        res.status(500).json({ error: "Server Error" });
      }
    });

    app.get('/api/getUser/:id', (req, res) => {   
      UserModel.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
    });

    app.put('/api/updateUser/:id', (req, res) => {  
      UserModel.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, email: req.body.email, age: req.body.age },
        { new: true }
      )
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json({ error: err.message }));
    });

    app.delete('/api/deleteUser/:id', (req, res) => {   
      UserModel.findByIdAndDelete(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
    });

    app.post('/api/create', (req, res) => {   
      UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
    });


  

    module.exports = app;

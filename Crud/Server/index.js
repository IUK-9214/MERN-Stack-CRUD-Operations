// ✅ index.js (for Vercel — no app.listen())

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//  CONNECT TO MONGO ATLAS
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.error(" MongoDB Connection Error:", err.message));

console.log(" Loaded MONGO_URI:", process.env.MONGO_URI ? "Found" : "Missing");

//  Test route
app.get("/", (req, res) => {
  res.send(" Backend is running successfully on Vercel!");
});

// CRUD ROUTES (note: all prefixed with /api)
app.get("/api/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users || []);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/api/getUser/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/updateUser/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/deleteUser/:id", async (req, res) => {
  try {
    const result = await UserModel.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/create", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Removed app.listen()
//  Export for Vercel
module.exports = app;

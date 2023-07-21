const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Note = require('./models/Note');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();
const crypto = require('crypto');

// Generate a random JWT secret of 64 characters (you can adjust the length as needed)
const jwtSecret = crypto.randomBytes(32).toString('hex');
// console.log('JWT Secret:', jwtSecret);
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB database'));

// Middleware
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// Registration route
app.post('/api/register', async (req, res) => {
    const { username, password, name } = req.body;
    try {

        // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, name });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  });
  
  // Login route
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // res.json({ token });
      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

// Middleware for verifying JWT tokens
app.use(authMiddleware);

// Create a new note
app.post('/api/notes', async (req, res) => {
  const { title, content, category, tags } = req.body;
  try {
    const newNote = new Note({
      title,
      content,
      category,
      tags,
      userId: req.user.userId,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Get all notes for the logged-in user
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get notes' });
  }
});

// Update a note by ID
app.put('/api/notes/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete a note by ID
app.delete('/api/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/persone';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Update schema with all fields being optional
const peopleSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false  // Changed to false
  },
  lastName: {
    type: String,
    required: false  // Changed to false
  },
  address: {
    type: String,
    required: false  // Changed to false
  },
  telephoneNumber: {
    type: String,
    required: false  // Changed to false
  },
  email: {
    type: String,
    required: false  // Changed to false
  },
  dateOfBirth: {
    type: String,    // Changed from Date to String
    required: false  // Changed to false
  }
}, { timestamps: true });

// Create People model with explicit collection name
const People = mongoose.model('People', peopleSchema, 'people');

// POST route to create a new person
app.post('/api/people', async (req, res) => {
  try {
    console.log('Received data:', req.body); // For debugging
    
    // Create new person with whatever data is provided
    const newPerson = new People(req.body);
    
    const savedPerson = await newPerson.save();
    res.status(201).json({
      message: 'Person created successfully',
      person: savedPerson
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Error creating person',
      error: error.message
    });
  }
});

// GET route to fetch all people
app.get('/api/people', async (req, res) => {
  try {
    const people = await People.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching people',
      error: error.message
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
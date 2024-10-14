// Budget API

const express = require('express'); // Import express
const cors = require('cors'); // Import cors
const mongoose = require('mongoose'); // Import mongoose
const bodyParser = require('body-parser'); // Import body-parser
const Budget = require('./models/budget_schema'); // Import the Budget model

const app = express(); // Create an instance of express
const port = 3000; // Define the port number

app.use(cors()); // Use cors for cross-origin requests
app.use(bodyParser.json()); // Middleware for parsing JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/personalBudget', {});

// Check MongoDB connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
}).on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// GET endpoint to fetch data from the database
app.get('/api/budget', async (req, res) => {
    try {
        const budgets = await Budget.find({});
        res.json(budgets);
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST endpoint to add new data to the database
app.post('/api/budget', async (req, res) => {
    const { title, relatedValue, color } = req.body;

    // Validate all fields
    if (!title || !relatedValue || !color) {
        return res.status(400).send('All fields (title, relatedValue, color) are required.');
    }

    try {
        const newBudget = new Budget({ title, relatedValue, color });
        await newBudget.save();
        res.status(201).send(newBudget);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start server
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});

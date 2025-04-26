// Load environment variables from .env
// dotenv: store the database credentials/API keys securely in .env file
require('dotenv').config();


// Import packages
// Express: Create the server and routes
const express = require('express');

// cors: allows frontend to call backend
const cors = require('cors');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get('/', (req, res) => {
    res.send('🌎 Climate API is running..');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
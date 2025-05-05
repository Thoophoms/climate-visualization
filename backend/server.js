// Load environment variables from .env
// dotenv: store the database credentials/API keys securely in .env file
require('dotenv').config();

// Import packages
// Express: Create the server and routes
const express = require('express');

// cors: allows frontend to call backend
const cors = require('cors');

const app = express();

// Import Database
const db = require('./db/db');

// Register the noaaRoutes
const noaaRoutes = require('./routes/noaa');

// // debugging line
// console.log("ENV test: ", process.env.DB_USER);

// Import temperature.js
const temperatureRoutes = require('./routes/temperature');

app.post('/test', (req, res) => {
    console.log('🔥 POST /test endpoint hit');
    res.send('Test POST route working!');
});

// Middleware
app.use(cors());
app.use(express.json());
// register temperature.js
app.use('/api', temperatureRoutes);
app.use('/api', noaaRoutes)


// Test route
app.get('/', (req, res) => {
    res.send('🌎 Climate API is running..');
});


// Start server
const PORT = process.env.PORT || 4000;;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
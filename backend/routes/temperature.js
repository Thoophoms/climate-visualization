// Load environment variabls incase we use them
require('dotenv').config();

// Import Express
const express = require('express');

// create a new router object to define routes
const router = express.Router();

// Import the MySQL database connection
const db = require('../db/db');


// -------------------------------------------
// POST /add-temperature
// This route will receive temperature data from the frontend
// and insert it into the `temperature_data` table
// -------------------------------------------
router.post('/add-temperature', (req, res) => {
    console.log('🔥 POST /add-temperature received');
    console.log('👉 Body:', req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
        console.error('❌ No body received!');
        return res.status(400).json({ error: 'No body received' });
    }
    // Extract values sent from frontend via JSON body
    const {
        location,
        temperature_celsius,
        temperature_fahrenheit,
        day,
        day_of_week
    } = req.body;

    // SQL query to insert values into the table
    const query = `
        INSERT INTO temperature_data
        (location, temperature_celsius, temperature_fahrenheit, day, day_of_week)
        VALUES (?, ?, ?, ?, ?)
    `;

    // Parameter to saftly insert into placeholders (?) above
    const values = [
        location,
        temperature_celsius,
        temperature_fahrenheit,
        day,
        day_of_week
    ];

    // Execute the query using the db connection
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('❌ Error inserting temperature data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('✅ Data inserted');
        res.status(201).json({ message: 'Temperature data inserted successfully!' });
    });
});


// -------------------------------------------
// GET /temperatures
// This route will fetch all temperature records from the database
// -------------------------------------------
router.get('/temperatures', (req, res) => {
    console.log('🔥 GET /temperatures received');

    // SQL query to fetch all data
    const query = 'SELECT * FROM temperature_data';

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Error fetching temperature data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('✅ Temperature data fetched:', results.length, 'records');
        res.status(200).json(results);
    });
});



// Export the router to use in main server.js
module.exports = router;
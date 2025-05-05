// Load environment variables from .env (to user NOAA_API_TOKEN)
require('dotenv').config();

// import express for creating routes
const express = require('express');
const router = express.Router();

// import Axios for making HTTP requests to NOAA
const axios = require('axios');

// ---------------------------------------------------------
// GET /api/fetch-noaa-data
// This route fetches NOAA datasets as a test
// This will be replaced this with actual temperature query
// ---------------------------------------------------------
router.get('/fetch-noaa-data', async (req, res) => {
    // Load NOAA API token from the environment file
    const token = process.env.NOAA_API_TOKEN;

    // NOAA test endpoint - returns available datasets
    const url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/datasets';

    try {
        // Make the API request with the token in headers
        const response = await axios.get(url, {
            headers: { token: token }
        });

        // Log and return the data
        console.log('✅ NOAA response:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('❌ Error fetching from NOAA:', error.message);
        res.status(500).json({ error: 'Failed to fetch NOAA data' });
    }
});

// Export this route so we can use it in server.js
module.exports = router;
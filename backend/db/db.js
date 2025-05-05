const mysql = require('mysql2');

// Create a database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
});


// Connect to the database
connection.connect((err) => {
    if (err) {
        console.log('Database connection failed: ' + err.stack);
    return;
    }
    console.log('✅ Connected to MySQL database!');
});

// // Debugging lines
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);


module.exports = connection;




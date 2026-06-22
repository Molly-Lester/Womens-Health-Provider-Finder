const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


db.connect((err) => {
    if (err) {
        console.log('DB connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


app.get('/clinics', (req, res) => {
    db.query('SELECT * FROM clinics', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

app.get('/geocode', async (req, res) => {
    const postcode = req.query.postcode;

    if (!postcode) {
        return res.status(400).json({ error: "Postcode is required" });
    }

    try {
        const response = await fetch(
            `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`
        );

        const data = await response.json();

        if (data.status !== 200) {
            return res.status(404).json({ error: "Postcode not found" });
        }

        const result = data.result;

        res.json({
            latitude: result.latitude,
            longitude: result.longitude
        });

    } catch (err) {
        res.status(500).json({ error: "Geocoding failed", details: err.message });
    }
});




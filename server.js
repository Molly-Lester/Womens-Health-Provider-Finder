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

// Harvesine formula to calculate distance between user and clinics using coordinates
function getDistanceMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8;

    const toRad = (v) => (v * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

// Query that gets all clinics (for testing purposes)
app.get('/clinics', (req, res) => {
    db.query('SELECT * FROM clinics', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// API using postcodes.io takes user postcode and returns the latitude and longitude 
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


// Query that gets clinics filtering by user postcode, radius, condition (concern_id) and provider type (clinic_type)
app.get('/clinics/nearby', async (req, res) => {
    const { postcode, radius, concern_id, clinic_type } = req.query;

    if (!postcode || !radius || !concern_id || !clinic_type) {
        return res.status(400).json({
            error: "postcode, radius, concern_id and clinic_type are required"
        });
    }

    try {
        // 1. Convert postcode to coordinates
        const geoResponse = await fetch(
            `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`
        );

        const geoData = await geoResponse.json();

        if (geoData.status !== 200) {
            return res.status(404).json({ error: "Invalid postcode" });
        }

        const userLat = geoData.result.latitude;
        const userLng = geoData.result.longitude;

        // 2. Build SQL query (category + provider type filtering)
        // distinct ensures that a clinic only appears once when using joins
        let sql = `
            SELECT DISTINCT c.*
            FROM clinics c
            JOIN clinic_concerns cc ON c.clinic_id = cc.clinic_id
            WHERE cc.concern_id = ?
        `;

        const params = [concern_id];

        // Only filter by NHS/Private if the user selected one (skip if "all")
        if (clinic_type && clinic_type !== "all") {
            sql += " AND c.clinic_type = ?";
            params.push(clinic_type);
        }

        // 3. Get matching clinics from DB
        db.query(sql, params, (err, clinics) => {
            if (err) {
                return res.status(500).json(err);
            }

            // 4. Handle radius 

            // If the user selects "Anywhere in the UK", don't apply a distance limit.
            // Otherwise convert the selected radius(e.g. "5", "10", "25") into a number.
            let radiusMiles;

            if (radius === "all") {
                radiusMiles = Infinity;
            } else {
                radiusMiles = Number(radius);
            }

            // 5. Distance filter
            const nearby = clinics.filter(clinic => {
                const distance = getDistanceMiles(
                    userLat,
                    userLng,
                    clinic.latitude,
                    clinic.longitude
                );

                return distance <= radiusMiles;
            });

            // 6. Return results
            res.json(nearby);
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.log('DB connection failed:', err);
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


async function getCoordinates(postcode) {
    const response = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`
    );

    const data = await response.json();

    if (data.status !== 200) {
        throw new Error("Invalid postcode");
    }

    return {
        latitude: data.result.latitude,
        longitude: data.result.longitude
    };
}


// Get all providers
// Used for testing the database connection

app.get('/clinics', async (req, res) => {

    try {

        const result = await db.query(`
            SELECT
                p.provider_id,
                p.provider_name,
                p.provider_type,
                p.website,
                p.phone_number,
                l.city,
                l.postcode,
                l.latitude,
                l.longitude

            FROM providers p

            JOIN locations l
            ON p.provider_id = l.provider_id;
        `);


        res.json(result.rows);


    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Could not retrieve providers"
        });

    }

});

// API using postcodes.io takes user postcode and returns the latitude and longitude 
app.get('/geocode', async (req, res) => {

    const postcode = req.query.postcode;


    if (!postcode) {

        return res.status(400).json({
            error: "Postcode is required"
        });

    }


    try {

        const coordinates = await getCoordinates(postcode);

        res.json(coordinates);


    } catch (error) {

        res.status(404).json({
            error: error.message
        });

    }

});


// Query that gets clinics filtering by user postcode, radius, condition (concern_id) and provider type (clinic_type)
// Find providers near a postcode
// Filters by service, provider type and distance

app.get('/clinics/nearby', async (req, res) => {

    const {
        postcode,
        radius,
        service_id,
        provider_type
    } = req.query;


    // Check required information exists
    if (!postcode || !radius || !service_id) {

        return res.status(400).json({
            error: "postcode, radius and service_id are required"
        });

    }


    try {

        // 1. Convert user postcode to coordinates

        const userLocation = await getCoordinates(postcode);

        const userLat = userLocation.latitude;
        const userLng = userLocation.longitude;

        // 2. Find matching providers

        let query = `

            SELECT
                p.provider_id,
                p.provider_name,
                p.provider_type,
                p.website,
                p.phone_number,

                l.address_line,
                l.city,
                l.postcode,
                l.latitude,
                l.longitude,

                s.service_name

            FROM providers p


            JOIN locations l
            ON p.provider_id = l.provider_id


            JOIN provider_services ps
            ON p.provider_id = ps.provider_id


            JOIN services s
            ON ps.service_id = s.service_id


            WHERE ps.service_id = $1

        `;


        const values = [service_id];


        // Optional NHS/private filter

        if (provider_type && provider_type !== "all") {

            query += `
                AND p.provider_type = $2
            `;

            values.push(provider_type);

        }



        const result = await db.query(query, values);

        // 3. Apply radius filter

        let radiusMiles;


        if (radius === "all") {

            radiusMiles = Infinity;

        } else {

            radiusMiles = Number(radius);

        }



        const nearbyProviders = result.rows.filter(provider => {


            if (!provider.latitude || !provider.longitude) {

                return false;

            }


            const distance = getDistanceMiles(

                userLat,
                userLng,

                Number(provider.latitude),
                Number(provider.longitude)

            );


            return distance <= radiusMiles;


        });

        // 4. Return results

        res.json(nearbyProviders);


    } catch (error) {


        console.log(error);


        res.status(500).json({

            error: "Could not find nearby providers"

        });

    }

});



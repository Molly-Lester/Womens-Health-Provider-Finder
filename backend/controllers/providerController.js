const db = require("../db/database");
const getCoordinates = require("../utils/geocode");
const getDistanceMiles = require("../utils/distance");

// Get all providers
// Used for testing the database connection

async function getProviders(req, res) {

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

}


async function geocodePostcode(req, res) {

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

}


// Find providers near a user's postcode.
// Filters by service, provider type and search radius.

async function getNearbyProviders(req, res) {

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

        // 1. Convert the user's postcode into coordinates

        const userLocation = await getCoordinates(postcode);

        const userLat = userLocation.latitude;
        const userLng = userLocation.longitude;


        // 2. Find providers that offer the selected service

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


        const queryValues = [service_id];


        // Only filter by provider type if the user selected NHS or Private

        if (provider_type && provider_type !== "all") {

            query += `
            AND p.provider_type = $2
        `;

            queryValues.push(provider_type);

        }


        // 3. Run the query

        const result = await db.query(query, queryValues);


        // 4. Convert the selected radius into miles

        let radiusMiles;

        if (radius === "all") {

            radiusMiles = Infinity;

        } else {

            radiusMiles = Number(radius);

        }


        // 5. Calculate the distance from the user to each provider

        const nearbyProviders = result.rows

            .map(provider => {

                const distance = getDistanceMiles(

                    userLat,
                    userLng,

                    Number(provider.latitude),
                    Number(provider.longitude)

                );

                return {

                    ...provider,

                    distance: Number(distance.toFixed(1))

                };

            })

            .filter(provider => provider.distance <= radiusMiles);


        // 6. Show the closest providers first

        nearbyProviders.sort((a, b) => a.distance - b.distance);


        // 7. Return the providers

        res.json(nearbyProviders);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Invalid postcode"
        });

    }

}


module.exports = {
    getProviders,
    geocodePostcode,
    getNearbyProviders
};
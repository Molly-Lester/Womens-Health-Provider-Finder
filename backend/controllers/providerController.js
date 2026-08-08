const db = require("../db/database");
const getCoordinates = require("../utils/geocode");

// Convert a user's postcode into latitude and longitude coordinates.
async function geocodePostcode(req, res) {
    const postcode = req.query.postcode;

    // Check that the user has entered a postcode.
    if (!postcode) {
        return res.status(400).json({
            error: "Postcode is required"
        });
    }

    try {
        // Get the latitude and longitude for the postcode.
        const coordinates = await getCoordinates(postcode);

        // Return the coordinates.
        res.json(coordinates);

    } catch (error) {
        // Return the error from geocode.js if the postcode is invalid.
        res.status(404).json({
            error: error.message
        });
    }
}


// Find providers near a user's postcode.
// Filters by service (fertility, menopause etc), provider type (NHS/Private/All) and search radius.

async function getNearbyProviders(req, res) {
    const {
        postcode,
        radius,
        service_id,
        provider_type
    } = req.query;

    // Check that all required search information has been provided.
    if (!postcode || !radius || !service_id) {
        return res.status(400).json({
            error: "postcode, radius and service_id are required"
        });
    }

    let userLocation;

    try {
        // Convert the user's postcode into latitude and longitude.
        userLocation = await getCoordinates(postcode);

    } catch (error) {
        // geocode.js throws "Invalid postcode" if the postcode lookup fails.
        return res.status(400).json({
            error: error.message
        });
    }

    try {
        const userLat = userLocation.latitude;
        const userLng = userLocation.longitude;

        // Convert the selected radius from miles to metres because
        // PostGIS geography distance functions use metres.
        // If "all" is selected, no radius filter will be added.
        const radiusMetres =
            radius === "all"
                ? null
                : Number(radius) * 1609.344;

        // Find providers that offer the selected service.
        // PostGIS calculates the distance between the user's searched location
        // and each provider's stored location.
        // ST_Distance returns metres, so divide by 1609.344 to return miles.
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

                s.service_name,

                ST_Distance(
                    l.coordinates,
                    ST_SetSRID(
                        ST_MakePoint($2, $3),
                        4326
                    )::geography
                ) / 1609.344 AS distance

            FROM providers p

            JOIN locations l
            ON p.provider_id = l.provider_id

            JOIN provider_services ps
            ON p.provider_id = ps.provider_id

            JOIN services s
            ON ps.service_id = s.service_id

            WHERE ps.service_id = $1
        `;

        // Store the values passed into the SQL query.
        // $1 = selected service
        // $2 = user's longitude
        // $3 = user's latitude
        const queryValues = [
            service_id,
            userLng,
            userLat
        ];

        // Only add the provider type filter if the user selected NHS or Private.
        if (provider_type && provider_type !== "all") {
            queryValues.push(provider_type);

            // Use the current number of query values to create
            // the correct SQL placeholder automatically.
            const providerTypeParameter = `$${queryValues.length}`;

            query += `
                AND p.provider_type = ${providerTypeParameter}
            `;
        }

        // Only add the distance filter if the user selected a specific radius.
        if (radius !== "all") {
            queryValues.push(radiusMetres);

            // Use the current number of query values to create
            // the correct SQL placeholder automatically.
            const radiusParameter = `$${queryValues.length}`;

            query += `
                AND ST_DWithin(
                    l.coordinates,
                    ST_SetSRID(
                        ST_MakePoint($2, $3),
                        4326
                    )::geography,
                    ${radiusParameter}
                )
            `;
        }

        // Return the closest providers first.
        query += `
            ORDER BY distance ASC
        `;

        // Run the completed PostGIS query.
        const result = await db.query(query, queryValues);

        // Return the matching providers to the frontend.
        res.json(result.rows);

    } catch (error) {
        console.log(error);

        // This catches database or PostGIS errors.
        res.status(500).json({
            error: "Could not retrieve nearby providers"
        });
    }
}


module.exports = {
    geocodePostcode,
    getNearbyProviders
};
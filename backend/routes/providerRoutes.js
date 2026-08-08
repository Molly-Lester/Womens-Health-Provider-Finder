const express = require("express");

const {
    geocodePostcode,
    getNearbyProviders
} = require("../controllers/providerController");

const router = express.Router();

router.get('/geocode', geocodePostcode);
router.get('/providers/nearby', getNearbyProviders);

module.exports = router;


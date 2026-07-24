const express = require("express");

const {
    getProviders,
    geocodePostcode,
    getNearbyProviders
} = require("../controllers/providerController");

const router = express.Router();

router.get('/providers', getProviders);
router.get('/geocode', geocodePostcode);
router.get('/providers/nearby', getNearbyProviders);

module.exports = router;


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
module.exports = getCoordinates;
const axios = require("axios").default;

module.exports = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFyc2gxMjM0NTY3OCIsImEiOiJja3pxdHNud24wOXE5MnVwYWZmMGd1anN3In0.4XzMUG5TeT2tUA6dtL5odg&limit=1`;

    axios
        .get(url)
        .then(({ data: { features } = {} } = {}) => {
            if (features.length === 0) return callback("Unable to find location. Try another search.", undefined);

            const longitude = features[0].center[0];
            const latitude = features[0].center[1];
            const location = features[0].place_name;

            callback(undefined, { latitude, longitude, location });
        })
        .catch((err) => callback(err, undefined));
};

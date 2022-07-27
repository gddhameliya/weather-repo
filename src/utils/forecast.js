const axios = require("axios").default;

module.exports = (address, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=daa35b865d15799fba36b5f0e5d1acef&query=${address}`;

    axios
        .get(url)
        .then(({ data }) => {
            if (data.error) return callback("Unable to find location. Try another search.", undefined);

            const date = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

            const {
                current: { temperature, precip },
                forecast: {
                    [date]: { maxtemp, mintemp }
                },
                location: { name, region, country }
            } = data || {};

            const forecast = `It is currently ${temperature} degrees out. The high temp. of today is ${maxtemp} and low temp. of today ${mintemp} There is a ${precip}% chance of rain.`;

            const location = `${name}, ${region}, ${country}`;

            callback(undefined, { forecast, location });
        })
        .catch((err) => callback(err.message, undefined));
};

const request = require('request');

const forecast = ( { latitude, longitude }, cb) => {
    const url = `https://api.darksky.net/forecast/85ecfe6478f141ea700d4e2faa17b942/${latitude},${longitude}?units=si`


    request({ url, json: true}, (error, response ) => {
        if (error) {
            cb('Can\`t connect to weather service', undefined)
            return
        } else if (response.body.error) {
            cb('Can\`t find  weather by your coordinates', undefined)
            return
        }

        const { temperature, precipProbability} = response.body.currently;

        cb(error, {
            temperature,
            precipProbability
        })
    });

}

module.exports = {
    forecast
}
const request = require('request');

const forecast = ( { latitude, longitude }, cb) => {
    const url = `https://api.darksky.net/forecast/85ecfe6478f141ea700d4e2faa17b942/${latitude},${longitude}?units=si`


    request({ url, json: true}, (error, {body} ) => {
        if (error) {
            cb('Can\`t connect to weather service', undefined)
            return
        } else if (body.error) {
            cb('Can\`t find  weather by your coordinates', undefined)
            return
        }
        cb(error, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. This high today is ${body.daily.data[0].temperatureHigh} with low of ${body.daily.data[0].temperatureLow}.`)
    });

}

module.exports = {
    forecast
}
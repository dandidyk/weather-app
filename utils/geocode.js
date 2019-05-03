const request = require('request')

const geoCode = (place, cb) => {
    const token = "pk.eyJ1IjoiZGFuZGlkeWsiLCJhIjoiY2p2NmNhbG1yMDFqbjN5bzE5cXE3eXNqcyJ9.5CRjKZg7iY_KkvC7LNnfcQ"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${token}`;

    request({ url, json:true }, (error, response) => {
        if (error) {
            cb('Can\`t connect to weather service', undefined)
            return
        } else if (response.body.features.length === 0) {
            cb('Can\`t find location', undefined)
            return
        }

        const [ longitude, latitude ] = response.body.features[0].center
        const location = response.body.features[0].place_name

        cb( undefined ,{
            latitude,
            longitude,
            location
        })
    })



}

module.exports = {
    geoCode
}
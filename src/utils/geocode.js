const request = require('request')

const getGeocode = (address, callback) => {
    const url =
        'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoibmlraGlsdmsiLCJhIjoiY2txcWt5eGw3MTdsZTJ1bnAxOGk5YWp2MiJ9.v5gfXTfax1JLhrzE4arCmg&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            console.log('Error : ' + error)
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            console.log('Invalid location')
            callback('Unable to find location. Try another search.',
                undefined)
        } else {
            console.log('Success')
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = getGeocode
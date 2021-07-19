const request = require('request')

const getForcaste = (latitude, longitude, callback) => {
    const url =
        'http://api.weatherstack.com/current?access_key=15fb2cb162e2fe4ed6ea1df64eb05551&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log('Error : ' + error)
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            console.log('Body Error :' + body.error.info)
            callback('Unable to get weather details. Try another search.',
                undefined)
        } else {
            console.log('Success')
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like '
                + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = getForcaste
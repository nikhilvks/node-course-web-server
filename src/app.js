const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeocode = require('./utils/geocode')
const getForecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

console.log(__filename)
console.log(__dirname)

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weathers',
        name: 'Nikhil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nikhil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some Help text',
        title: 'Help',
        name: 'Nikhil'
    })
})

app.get('/weather', ({ query }, res) => {
    if (!query.address) {
        return res.send({
            errorMessage: 'address required'
        })
    }

    getGeocode(query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            console.log('Error', error)
            return res.send({
                error
            })
        }

        getForecast(latitude, longitude, (error, forecast) => {
            if (error) {
                console.log('Error', error)
                res.send({
                    error
                })
            } else {
                res.send({
                    forecast,
                    location,
                    address: query.address
                })
            }
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikhil',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikhil',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
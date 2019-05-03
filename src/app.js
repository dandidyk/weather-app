const path = require('path')
const express = require('express');
const hbs = require('hbs');

const { geoCode } = require('../utils/geocode');
const { forecast } = require('../utils/forecast')

const port = process.env.PORT || 3000
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup views engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bohdan'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    console.log(address)

    if ( !address ) {
        return res.send({
           error:'Error message'
        });
    }

    geoCode( address, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(data, (error , { temperature, precipProbability } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                temperature: `It is currently ${temperature} deegrees.`,
                precipProbability: `${precipProbability * 100}% chance of rain`,
                location: address
            })
        })
    
    })
    

    
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Bohdan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'I will help you',
        title: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'MY 404',
        message: 'Article not found',
        name: 'Bohdan'
    })
})


app.get('*', (req, res) => {
    res.render('404',{
        title: 'MY 404',
        message: 'Page not found',
        name: 'Bohdan'
    })
})


app.listen(port, () => {
    console.log('App running'+ port)
})
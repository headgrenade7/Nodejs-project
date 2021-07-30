const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars enginee and vies location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'name'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Node js',
        name: 'Node js'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content: 'May find some help',
        name: 'Cedric'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'You must provide a address'
        })
        return
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        else{
            forecast(latitude, longitude, (error, forecastdata) => {
                if(error){
                    return res.send({error})
                }
                else{
                    res.send({
                        forecast: forecastdata,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
        return
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        content: 'Help article not found',
        name: 'Error'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        content: 'Page not found',
        name: 'Error'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
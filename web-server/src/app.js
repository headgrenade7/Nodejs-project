const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
    res.send('<h1>Weather</h1>')
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
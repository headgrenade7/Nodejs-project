const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send('Hello Express')
})

app.get('/help', (req, res) => {
    res.send('Help Page')
})

app.get('/about', (req, res) => {
    res.send('<h1>About this page</h1>')
})

app.get('/weather', (req, res) => {
    res.send('Weather')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
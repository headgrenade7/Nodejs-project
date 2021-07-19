const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=1992291bae7abaf772656fec439db256&query=37.8267,-122.4233'

request({url: url, json: true}, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.current)
})
const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1992291bae7abaf772656fec439db256&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to forecast service', undefined)
        }
        else if(body.error){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined, {
                temp: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast
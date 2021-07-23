const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if(!address){
    console.log('Pleaes provide an address')
}
else{
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return console.log(error)
        }
        else{
            forecast(latitude, longitude, (error, forecastdata) => {
                if(error){
                    return console.log(error)
                }
                else{
                    console.log('Currently ' + forecastdata.temp + ' degree out. It feelslike ' + forecastdata.feelslike + ' degree')
                }
            })
        }
    })
}
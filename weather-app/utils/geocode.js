const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2VkcmljdCIsImEiOiJja3JhOGE3OTM0Zzl4MnV0ZnFlM2MxZ3Y2In0.Az1NbafBhW8TnJhu2MIHFQ&limit=1'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to geo service', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
const request = require('postman-request')

const geocodeWeather = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW50aG9ueWh2bzEyIiwiYSI6ImNrOWRsMmY2cTA0dm0za3M2dTI0NHZ3OW8ifQ.SxC0NuQpeGQiwXjstd9JzQ'
//    console.log(url)
    request({url: url, json: true}, (error, {body: {features}}) => {
        if (error) {
            callback("Unable to connect to the weather service")
        }
        else if (features.length == 0) {
            callback("No matching location found")
        }
        else {
            callback(null, 

                {
                long: features[0].center[0],
                lat: features[0].center[1],
                location: features[0].place_name
                
            })
        //    weather(long, lat, callback)
        }
    })
}

module.exports = geocodeWeather
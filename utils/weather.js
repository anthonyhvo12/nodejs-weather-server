const request = require('postman-request')

const weather = (long, lat, callback) => {
    url = 'https://api.darksky.net/forecast/43272ba3b999ba98f6c4074f0dc2446f/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + ''
    // console.log(url)
    // request({url: url, json: true}, (error, response) => {
    //     if (error) {
    //         callback("Unable to connect to the weather service", null)
    //     }
    //     else if (response.body.daily == null) {
    //         callback("Cannot find the requested location", null)
    //     }
    //     else {
    //         callback(null, response.body.daily.data[0].summary + 'The temperature is ' + response.body.currently.temperature + '. There is '
    // + response.body.currently.precipProbability + '% chance of rain!')
    //     }
    // })
    request({url: url, json: true}, (error, {body: {daily, currently}} = {}) => {
            if (error) {
                callback("Unable to connect to the weather service", null)
            }
            else if (daily == null) {
                callback("Cannot find the requested location", null)
            }
            else {
                callback(null, daily.data[0].summary + 'The temperature is ' + currently.temperature + '. There is '
        + currently.precipProbability + '% chance of rain!')
            }
        })
}
module.exports = weather
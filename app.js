const express = require('express')
const path = require('path')
const geocode = require('./utils/geolocation.js')
const weather = require('./utils/weather.js')

const app = express()
const port = process.env.PORT || 3000

// DEFINE PATHS
const publicDirectoryPath = path.join(__dirname, '/public')
const viewsDirectoryPath = path.join(__dirname, '/templates')
// console.log(publicDirectoryPath)

// Setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        'Fav' : 'Barley',
        'Least' : 'Ham'
    }) //just need name, no extension
})
app.get('', (req, res) => {
    res.send('WELCOMEE TO BEST LEADER EVAHHHH\'S PAGE')
})

app.get('/help', (req, res) => {
    res.send('How can I help u?')
})

app.get('/about', (req, res) => {
    // res.send('about', [{
    //     name: 'Anthony', //nonstandard formatting - JSON must have 
    //     age: 21
    // },
    // {
    //     name: 'Nulosa',
    //     age: 18
    // }])
    res.render('about', {
        "name": "Anthony",
        "description": "best leader evahh"
    })
})

//Wire up weather
/*
1. require geocode/forecast into app.js
2. use address to geocode
3. use coordinates to get forecast
4. send back forecast & loc
*/
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'u must enter a valid address!'
        })
    }
    geocode(req.query.address, (error, {long, lat, location} = {}) => {
        if (error) return res.send({error}) //console.log(error)
        weather(long, lat, (error, data) => {
            if (error) return res.send({error}) //console.log(error)
            res.send({
                location,
                data
            })
        })
    })
})

// app.get('/weather', (req, res) => {
//     res.send('<h1>Weather in Cat Lai</h1>'/*, [{
//         location: 'Carlisle',
//         temp: 46
//     }] */)
// })

app.listen(port, () => {
    console.log('Server is up and running')
})
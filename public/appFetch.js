console.log('Client side JS file is loaded')

//fetch the weather for Boston
// parse JSON response
fetch('http://localhost:3000/weather?address=sdsfsfewferfr').then((response) => {
    response.json().then((response) => {
        if (response.error) console.log(response.error)
        else {
            console.log(response.location)
            console.log(response.data)
        }
    })
})
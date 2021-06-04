const request = require('postman-request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// const forecast = (longitude, latitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=4676df4940500c7e4460d0a47cf2aa8b&query='+ longitude + ',' + latitude +'&units=f'

//     request({url: url, json: true},(error, response) => {
//         if(error){
//             callback('Unable to connect to weather API', undefined)
//         }else if(response.body.error){
//             callback('Unable to find location', undefined)
//         }else{
//             const msg = 'It is ' + response.body.current.weather_descriptions[0] + ' today. It is currently ' + response.body.current.temperature + ' degress out, but it feels like ' + response.body.current.feelslike + ' degrees outside.'
//             callback(undefined, msg)
//         }
//     })
// }

// applying inline destructuring
const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4676df4940500c7e4460d0a47cf2aa8b&query='+ longitude + ',' + latitude +'&units=f'

    request({ url , json: true},(error, { body }) => {
        if(error){
            callback('Unable to connect to weather API', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            const msg = 'It is ' + body.current.weather_descriptions[0] + ' today. It is currently ' + body.current.temperature + ' degress out, but it feels like ' + body.current.feelslike + ' degrees outside. ' + 'The humidity is '+ body.current.humidity + '%.'
            callback(undefined, msg)
        }
    })
}

module.exports = forecast
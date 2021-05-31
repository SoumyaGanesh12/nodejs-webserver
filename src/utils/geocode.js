const request = require('postman-request')

// const geocode = (address, callback) => {
//     // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1Ijoic291bXlhZ2FuZXNoIiwiYSI6ImNrcDl4NXBweDBrdmEybnBlb2N1eGxwZmEifQ.P_m4urOuedb61uCxeakljg'
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic291bXlhZ2FuZXNoIiwiYSI6ImNrcDl4NXBweDBrdmEybnBlb2N1eGxwZmEifQ.P_m4urOuedb61uCxeakljg'
//     request({url: url, json: true}, (error, response) => {
//         if(error){
//             callback('Unable to connect to weather API', undefined)
//         }else if(response.body.features.length === 0){
//             callback('Unable to find location services. Try another search', undefined)
//         }else{
//             callback(undefined, {
//                 location: response.body.features[0].place_name,
//                 longitude: response.body.features[0].center[0],
//                 latitude: response.body.features[0].center[1]
//             })
//         }
//     })

// }

// applying inline destructuring
const geocode = (address, callback) => {
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1Ijoic291bXlhZ2FuZXNoIiwiYSI6ImNrcDl4NXBweDBrdmEybnBlb2N1eGxwZmEifQ.P_m4urOuedb61uCxeakljg'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic291bXlhZ2FuZXNoIiwiYSI6ImNrcDl4NXBweDBrdmEybnBlb2N1eGxwZmEifQ.P_m4urOuedb61uCxeakljg'
    request({ url , json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather API', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location services. Try another search', undefined)
        }else{
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })

}

module.exports = geocode

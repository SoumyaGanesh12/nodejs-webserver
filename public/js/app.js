// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// console.log("Client side javascript file is loaded!")

// fetch('http://localhost:3000/weather?address=tamilnadu').then((response) => {
// fetch('http://localhost:3000/weather?address=t!').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log('Error: ', data.error)
//         }else{
//             console.log('Location: ', data.location)
//             console.log('Forecast: ', data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')

const messageOne= document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent = 'Hello '

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault() // default action of page: refresh and reset the value, if this happens the user cannot see his own typed value when he click submit
    // we use this function to prevent the defaults

    const location = searchLocation.value
    messageOne.textContent ='Loading...'
    messageTwo.textContent =''
    
    // const url = 'http://localhost:3000/weather?address=' + location
    // changing it to match with heroku provided port number, so we cant hardcode it (it may or may not be 3000)
    const url = '/weather?address=' + location
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            // console.log('Error: ', data.error)
            messageOne.textContent =  data.error
        }else{
            // console.log('Location: ', data.location)
            // console.log('Forecast: ', data.forecast)
            messageOne.textContent = 'Location: ' + data.location
            messageTwo.textContent = 'Forecast: ' + data.forecast
            
        }
        })
    })
    
})
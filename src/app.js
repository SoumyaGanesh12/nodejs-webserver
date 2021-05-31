const express = require('express')
const path = require('path') // builtin core module  
const hbs = require('hbs') // loaded only because we need to use partials
const { response } = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public') // it searches for index.html (index is standard name for first hml page)
const viewsPath = path.join(__dirname,'../templates/views') // we moved views folder inside templates to set the default location that express looks for, to a different folder i.e, by default, express looks for views folder but we are changing it to look for templates folder
const partialsPath = path.join(__dirname,'../templates/partials')

// console.log(__dirname) - path upto src
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // localhost:3000 and localhost:3000/index.html shows the content in index.html

// As we have set the static directory to folder public, it will look for index, about etc. there which is why we have renamed all the html files there,
// actually sir deleted it as we no longer require that files 

// an application may contain multiple pages
// app.com
// app.com/home
// app.come/help
// app.com/about 

// '' = app.com or localhost:3000
// app.get('', (req, res) => {
//     res.send('Hello, welcome to express') //this will never get executed as app.use uses the index.html
// })  // you can comment this app.get()

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Soumya'
    }) // since we have already set the view engine no need of extension and it will look for index.hbs
})

app.get('/home', (req, res) => {
    res.send('<h1><i> Home Page </i></h1>')
}) 

// sending json 
// it is automatically going to stringify the json for us and send it back to the requestor
app.get('/about', (req, res) => {
   // res.send('About page')
//    res.send ({
//        name: 'soumi',
//        age: 22
//    })
    res.render('about',{
        title: 'About Me',
        name: 'Soumya'
    })
  
})

// array of objects
app.get('/help', (req, res) => {
    // res.send('Help page')
    // res.send ([{
    //     name: 'soumi',
    //     phone: 123452618
    // },{
    //     name: 'heera',
    //     phone: 837239221
    // }])
    res.render('help', {
        title: 'Help Page',
        name: 'Soumya',
        message: 'You can reach out to us anytime!'
    })
    
  })

// we can send back html to the requestor
// app.get('/weather', (req, res) => {
//    // res.send('Welcome to weather forecast')
//    res.send({
//         location: 'Boston',
//         forecast:  'It is partially cloudy today. It is currently 22 degress out, but it feels like 16 degrees outside.'      
//    })
// })


app.get('/weather', (req, res) => {
    if(!req.query.address){
        // return res.send({
        res.send({
            error: 'Address must be provided'
        })                 
    }else{
        geocode(req.query.address, (error, {longitude, latitude, location} = {}) =>{ // default value : {} empty object otherwise program will crash if longitude, latitude, location is not given 
            if(error){
               return res.send({ error })
            }
            forecast(longitude, latitude, (error, forecastData) => {
                if(error){
                   return res.send({ error })
                }
                
                res.send({
                    address: req.query.address,
                    location,
                    forecast: forecastData
                })
            })
        })
    }
    // res.send({
    //      location: req.query.address,
    //      forecast: 'It is partially cloudy today. It is currently 22 degress out'
    // })
 })


app.get('/products',(req, res) => {
    //console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

// error specific to incorrect url after help in url
app.get('/help/*', (req, res) => {
    // res.send("Help article not found!")
    res.render('error',{
        title: '404 Error: Help article',
        name: 'Soumya',
        errorText: 'Help article not found'
    })
})

// to show error page when user searches for an incorrect url
app.get('*', (req, res) => {
    // res.send("My 404 error page")
    res.render('error', {
        title: '404 Error: Page',
        name: 'Soumya',
        errorText: 'Page not found'
    })
})


// to start the server
app.listen(3000, () => {
    console.log('Server is up and running!')
})

// type in browser address bar -> localhost:3000
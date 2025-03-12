# Weather App

This is a Node.js application using Express, Handlebars, and external APIs to fetch and display weather information based on user input.

## Features
- Fetch weather data based on user-provided address
- Uses the Mapbox API for geocoding and WeatherStack API for weather forecast
- Serves static pages with Handlebars templating
- Error handling for invalid routes and missing parameters

## Installation

### Prerequisites
- Node.js installed on your system
- API keys for Mapbox and WeatherStack

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your API keys:
   ```env
   MAPBOX_API_KEY=your_mapbox_api_key
   WEATHERSTACK_API_KEY=your_weatherstack_api_key
   ```
4. Start the application:
   ```sh
   npm start
   ```

## API Endpoints

### `GET /weather`
Fetches weather information for a given address.

#### Query Parameters
- `address` (string) - The location for which weather data is required.

#### Example Request
```sh
curl "http://localhost:3000/weather?address=Miami"
```

#### Example Response
```json
{
  "address": "Miami",
  "location": "Miami, Florida, USA",
  "forecast": "It is currently 22°C, partly cloudy."
}
```

## Project Structure
```
weather-app/
│── public/               # Static assets (HTML, CSS, JS)
│── src/
│   ├── utils/
│   │   ├── geocode.js    # Handles geocoding using Mapbox API
│   │   ├── forecast.js   # Fetches weather data using WeatherStack API
│   ├── app.js            # Main server file
│── templates/
│   ├── views/            # Handlebars view templates
│   ├── partials/         # Reusable partial templates
│── package.json          # Project metadata and dependencies
│── README.md             # Project documentation
```

## Deployment
To deploy on Heroku:
1. Login to Heroku:
   ```sh
   heroku login
   ```
2. Create a Heroku app:
   ```sh
   heroku create weather-app-demo
   ```
3. Deploy the application:
   ```sh
   git push heroku main
   ```
4. Open the application in your browser:
   ```sh
   heroku open
   ```


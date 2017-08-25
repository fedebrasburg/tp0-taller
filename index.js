const express = require('express')
const app = express()
const WeatherService = require('./weather/services/weatherService.js')

app.set('port', (process.env.PORT || 5000))

app.use(express.static(`${__dirname}/public`))

// views is directory for all template files
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')

app.get('/weather/cities/:cityId', (request, response) => {
    WeatherService().getWeather(request.params.cityId).then(weather => response.json(weather))
})

app.get('/weather/cities/name/:name', (request, response) => {
    WeatherService()
    	.getCities(request.params.name)
    	.then(cities => response.json(cities))
    	.catch(err => {
    		response.status(406);
    		response.json({ message: "City name should have at least two characters" })
    	});
})

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})

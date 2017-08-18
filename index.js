var express = require('express');
var app = express();
const WeatherService = require('./weather/services/weatherService.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/weather/cities/:cityId', function(request, response) {
    WeatherService().getWeather(request.params.cityId).then(weather => response.json(weather));
});

app.get('/weather/cities', function(request, response) {
    WeatherService().getCities().then(cities => response.json(cities));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

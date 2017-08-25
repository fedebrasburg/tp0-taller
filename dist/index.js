"use strict";

var _weatherService = require("./services/weatherService.js");

var _weatherService2 = _interopRequireDefault(_weatherService);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 5000);

app.use(_express2.default.static(__dirname + "/public"));

// views is directory for all template files
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.get('/weather/cities/:cityId', function (request, response) {
    (0, _weatherService2.default)().getWeather(request.params.cityId).then(function (weather) {
        return response.json(weather);
    });
});

app.get('/weather/cities/name/:name', function (request, response) {
    (0, _weatherService2.default)().getCities(request.params.name).then(function (cities) {
        return response.json(cities);
    }).catch(function (err) {
        response.status(406);
        response.json({ message: "City name should have at least two characters" });
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
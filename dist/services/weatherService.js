"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = WeatherService;

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = _bluebird2.default.promisifyAll(_fs2.default);

function WeatherService() {
    return {
        getWeather: function getWeather(cityId) {
            return (0, _nodeFetch2.default)(makeUrl(cityId)).then(function (weather) {
                return weather.json().then(function (res) {
                    return {
                        weather: res.weather[0].main,
                        pressure: res.main.pressure,
                        temperature: res.main.temp,
                        city: res.name,
                        country: res.sys.country
                    };
                });
            });
        },
        getCities: function getCities(name) {
            if (!name || name.length < 2) {
                return _bluebird2.default.reject();
            }
            var filename = name.substr(0, 2) + ".json";
            var path = "./weather/services/files/" + filename;
            if (!fs.existsSync(path)) {
                return _bluebird2.default.resolve([]);
            }
            return fs.readFileAsync(path, 'utf8').then(function (data) {
                return JSON.parse(data).filter(function (city) {
                    var regex = new RegExp("^" + name + ".*", 'i');
                    return regex.test(city.name);
                });
            });
        }
    };
}

var makeUrl = function makeUrl(cityId) {
    return "http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&units=metric&APPID=589099769890849ac40bc3c154da93a8";
};
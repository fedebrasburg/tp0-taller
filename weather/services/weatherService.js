var fetch = require('node-fetch');

const url = 'http://api.openweathermap.org/data/2.5/weather?id=6559994&APPID=589099769890849ac40bc3c154da93a8';

module.exports = function weatherService() {

    var self = {
        getWeather: (cityId) => {
            return fetch(url).then((weather) => weather.json());
        }
    };
    return self;
};

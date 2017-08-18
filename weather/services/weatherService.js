const fetch = require('node-fetch');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
// 6559994 es la de Buenos Aires ;)


module.exports = function weatherService() {

    var self = {
        getWeather: (cityId) => {
            return fetch(makeUrl(cityId))
                .then((weather) => weather.json().then((res => {
                   return {
                       weather: res.weather[0].main,
                       temperature: res.main.temp,
                       humidity: res.main.humidity
                   }
                })));
        },

        getCities: () => {
            return fs.readFileAsync('./weather/services/files/cityList.json', 'utf8').then((data) => {
                return JSON.parse(data).map( (city) => {
                    return {
                        id: city.id,
                        name: city.name
                    }
                });
            });
        }

    };

    return self;
};

const makeUrl = (cityId) => {
    return 'http://api.openweathermap.org/data/2.5/weather?id='+cityId+'&APPID=589099769890849ac40bc3c154da93a8';
}

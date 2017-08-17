var fetch = require('node-fetch');
// 6559994 es la de Buenos Aires ;)


module.exports = function weatherService() {

    var self = {
        getWeather: (cityId) => {
            return fetch(makeUrl(cityId)).then((weather) => weather.json());
        }
    };

    return self;
};

const makeUrl = (cityId) => {
    console.log( 'http://api.openweathermap.org/data/2.5/weather?id='+cityId+'&APPID=589099769890849ac40bc3c154da93a8');
    return 'http://api.openweathermap.org/data/2.5/weather?id='+cityId+'&APPID=589099769890849ac40bc3c154da93a8';
}

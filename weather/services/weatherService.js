const fetch = require('node-fetch')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
// 6559994 es la de Buenos Aires ;)


module.exports = function weatherService() {
    return {
        getWeather: (cityId) => {
            return fetch(makeUrl(cityId))
                .then((weather) => weather.json().then((res => {
                   return {
                       weather: res.weather[0].main,
                       pressure: res.main.pressure,
                       temperature: res.main.temp,
                       city: res.name
                   }
                })))
        },
        getCities: (name) => {
            if (!name || name.length < 2) {
                // TODO: No se que habria que devolver en estos casos
                return JSON.parse("[]")
            }
            const filename = `${name.substr(0, 2)}.json`
            const path = `./weather/services/files/${filename}`
            if (!fs.existsSync(path)) {
                // TODO: No se que habria que devolver en estos casos
                return JSON.parse("[]")
            }
            return fs.readFileAsync(path, 'utf8').then((data) => {
                return JSON.parse(data).map( (city) => {
                    return {
                        id: city.id,
                        name: city.name,
                        country: city.country
                    }
                })
            })
        }
    }
}

const makeUrl = (cityId) => {
    return `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&APPID=589099769890849ac40bc3c154da93a8`
}

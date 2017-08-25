const fetch = require('node-fetch')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
// 3435910 es la de Buenos Aires ;)


module.exports = function weatherService() {
    return {
        getWeather: (cityId) => {
            return fetch(makeUrl(cityId))
                .then((weather) => weather.json().then((res => {
                   return {
                       weather: res.weather[0].main,
                       pressure: res.main.pressure,
                       temperature: res.main.temp,
                       city: res.name,
                       country: res.sys.country
                   }
                })))
        },
        getCities: (name) => {
            if (!name || name.length < 2) {
                return Promise.resolve([])
            }
            const filename = `${name.substr(0, 2)}.json`
            const path = `./weather/services/files/${filename}`
            if (!fs.existsSync(path)) {
                return Promise.resolve([])
            }
            return fs.readFileAsync(path, 'utf8').then((data) => {
                return JSON.parse(data).filter( (city) => {
                    const regex = new RegExp(`^${name}.*`, 'i')
                    return regex.test(city.name)
                })
            })
        }
    }
}

const makeUrl = (cityId) => {
    return `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&APPID=589099769890849ac40bc3c154da93a8`
}

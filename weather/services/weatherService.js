import fetch from "node-fetch"
import Promise from "bluebird"
import fs0 from "fs"

const fs = Promise.promisifyAll(fs0)

export default function WeatherService() {
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
                return Promise.reject()
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

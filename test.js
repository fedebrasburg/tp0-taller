const assert = require('assert')
const WeatherService = require('./weather/services/weatherService.js')

describe('WeatherService', () => {
    describe('#getCities()', () => {
        it('should return empty array when sending a name with only one letter', () => {
            return WeatherService().getCities("b").then((data) => {
                assert.equal(0, data.length)
            })
        })
        it('should return empty array when sending a name that does not have a matching file', () => {
            return WeatherService().getCities("xz").then((data) => {
                assert.equal(0, data.length)
            })
        })
        it('should return a non empty array when sending a name with two letters', () => {
            return WeatherService().getCities("bu").then((data) => {
                assert.notEqual(0, data.length)
            })
        })
    })
})

const WeatherService = require('./weather/services/weatherService.js')
const chai = require('chai')
const expect = chai.expect

describe('WeatherService', () => {
    describe('#getCities()', () => {
        it('should return empty array when sending a name with only one letter', () => {
            return WeatherService().getCities("b").then((data) => {
                expect(data.length).to.equal(0)
            })
        })
        it('should return empty array when sending a name that does not have a matching file', () => {
            return WeatherService().getCities("xz").then((data) => {
                expect(data.length).to.equal(0)
            })
        })
        it('should return a non empty array when sending a name with two letters', () => {
            return WeatherService().getCities("bu").then((data) => {
                expect(data.length).to.be.greaterThan(0)
            })
        })
        it('should return a non empty array when sending a name with more than two letters', () => {
            return WeatherService().getCities("buenos").then((data) => {
                expect(data.length).to.be.greaterThan(0)
            })
        })
    })
})

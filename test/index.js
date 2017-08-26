import WeatherService from "../weather/services/weatherService.js"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const expect = chai.expect

describe('WeatherService', () => {
    describe('#getCities', () => {
        it('should return empty array when sending a name with only one letter', () => {
            return expect(WeatherService().getCities("b")).to.be.rejected
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

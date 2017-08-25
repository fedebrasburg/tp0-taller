'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = _fs2.default.readFileSync('./weather/services/files/city.list.json', 'utf8');

var result = JSON.parse(data).reduce(function (hash, obj) {
    var key = obj.name.substr(0, 2).toLowerCase();
    hash[key] = (hash[key] || []).concat({ name: obj.name, id: obj.id, country: obj.country });
    return hash;
}, {});

Object.keys(result).forEach(function (key) {
    var value = result[key];
    _fs2.default.writeFile('./weather/services/files/' + key + '.json', JSON.stringify(value), function (err) {
        if (err) {
            return console.log(err);
        }
    });
});
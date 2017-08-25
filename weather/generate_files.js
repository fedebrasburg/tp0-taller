import fs from "fs"

const data = fs.readFileSync('./weather/services/files/city.list.json', 'utf8')

const result = JSON.parse(data).reduce((hash, obj) => {
    const key = obj.name.substr(0, 2).toLowerCase()
    hash[key] = (hash[key] || []).concat({ name: obj.name, id: obj.id, country: obj.country })
    return hash
}, {})

Object.keys(result).forEach(key => {
    const value = result[key]
    fs.writeFile(`./weather/services/files/${key}.json`, JSON.stringify(value), err => {
        if (err) {
            return console.log(err)
        }
    })
})

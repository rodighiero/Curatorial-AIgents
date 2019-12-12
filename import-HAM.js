
/////////////////////////////
// Libraries
/////////////////////////////

const beautify = require('beautify')
// const fs = require('fs')
const path = require('path')
// const convert = require('xml-js')
// const fetch = require('request-promise');
// const data = require('./data/HAM/metadata-large.csv')
// const fetch = require("node-fetch")
// const d3 = require('d3')



const fs = require('fs');
const csv = require('csv-parser')

const results = [];

fs.createReadStream('./data/HAM/metadata-large.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => createJson(results))

const createJson = (data) => {

    let docs = []

    data.forEach(record => {
        if (record.title.length > 80) {
            console.log(record.title.length)
            const obj = {}
            obj.id = record.objectid
            obj.text = record.title
            docs.push(obj)
        }
    })


    const format = json => beautify(JSON.stringify(json), { format: 'json' })
    const setComma = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    let fileName = path.resolve(__dirname, `./data/docs.json`)

    fs.writeFile(fileName, format(docs), err => {
        if (err) throw err
        console.log('Size of docs.json', setComma(format(docs).length), 'kb')
        console.log('Records of docs.json', setComma(docs.length))
    })

}
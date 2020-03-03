/////////////////////////////
// Harvard Computational Cloud
/////////////////////////////

// const express = require("express")
// const os = require("os")
// const cluster = require("cluster")

// const PORT = process.env.PORT || 5000

// const clusterWorkerSize = os.cpus()

// console.log(clusterWorkerSize, 'available CPUs')

// if (clusterWorkerSize > 1) {
//     if (cluster.isMaster) {
//         for (let i = 0; i < clusterWorkerSize; i++) {
//             cluster.fork()
//         }

//         cluster.on("exit", function (worker) {
//             console.log("Worker", worker.id, " has exitted.")
//         })
//     } else {
//         const app = express()

//         app.listen(PORT, function () {
//             console.log(`Express server listening on port ${PORT} and worker ${process.pid}`)
//         })
//     }
// } else {
//     const app = express()

//     app.listen(PORT, function () {
//         console.log(`Express server listening on port ${PORT} with the single worker ${process.pid}`)
//     })
// }




/////////////////////////////
// Libraries
/////////////////////////////

const combinatorics = require('js-combinatorics')
const fs = require('fs')
const natural = require('natural')
const accents = require('remove-accents')
sw = require('stopword')




/////////////////////////////
// Reading dics.json
/////////////////////////////

fs.readFile(__dirname + '/data/docs.json', (err, data) => {


    // 
    // Set data
    //

    if (err) throw err
    let docs = JSON.parse(data)

    docs.forEach(doc => doc.id = parseInt(doc.id))


    // 
    // Remove documents by length
    // 

    // docs = docs.filter((doc) => {
    //     return doc.text.length > 300
    // })





    // 
    // Set items
    // 

    const items = docs



    // 
    // Text Analysis
    //

    // Tokenizer
    const tokenizer = new natural.WordTokenizer()
    items.forEach((item, i) => {
        console.log('Token computing', i)
        item.tokens = tokenizer.tokenize(item.text)
    })



    // Singularize
    const inflector = new natural.NounInflector()
    const safeList = ['']
    items.forEach(item => item.tokens = item.tokens.map(t =>
        safeList.includes(t) ? t : inflector.singularize(t)
    ))

    // Cleaning
    const stopWords = ['']
    items.forEach(item => item.tokens = item.tokens.filter(token => token.length > 2))
    items.forEach(item => item.tokens = item.tokens.filter(token => !stopWords.includes(token)))
    items.forEach(item => item.tokens = item.tokens.filter(token => !parseInt(token)))
    items.forEach(item => item.tokens = sw.removeStopwords(item.tokens))
    // items.forEach(item => item.tokens = sw.removeStopwords(item.tokens, sw.br))
    // items.forEach(item => item.tokens = sw.removeStopwords(item.tokens, sw.de))
    // items.forEach(item => item.tokens = sw.removeStopwords(item.tokens, sw.fr))
    // items.forEach(item => item.tokens = sw.removeStopwords(item.tokens, sw.it))
    // items.forEach(item => item.tokens = sw.removeStopwords(item.tokens, sw.pt))


    // TF-IDF
    const tokenFrequency = new natural.TfIdf()
    items.forEach((item, i) => {
        console.log('Frequency computing', i)
        tokenFrequency.addDocument(item.tokens)
    })



    const tfidfLimit = 10

    // items.forEach((item, i) => {
    //     console.log('Token reduction', i)
    //     item.tokens = tokenFrequency.listTerms(i)
    //         .filter(el => el.tfidf > tfidfLimit) // On threshold
    //     // .slice(0, tfidfLimit) // On top elements
    // })


    // Delete text from items to lighten the file 
    // items.forEach(item => delete item.text)




    //
    // Set network
    //

    const pairs = combinatorics.bigCombination(items, 2) // Set pairs
    const nodes = items // Set node object
    const links = [] // Set link object
    let i = pairs.length
    let maxCommonTokens = 0

    // while (pair = pairs.next()) {

    //     const id1 = parseInt(pair[0].id), id2 = parseInt(pair[1].id)
    //     const t1 = pair[0].tokens, t2 = pair[1].tokens
    //     const k1 = t1.map(element => element.term), k2 = t2.map(element => element.term)
    //     const tokens = k1.filter(n => k2.includes(n))
    //     i--

    //     if (tokens.length === 0) continue

    //     maxCommonTokens = maxCommonTokens > tokens.length ? maxCommonTokens : tokens.length

    //     console.log('#', i, '|', tokens.length, 'terms between', id2, 'and', id1)

    //     tokens.forEach(token => {

    //         const link = links.find(link => link.source === id1 && link.target === id2)
    //         const value1 = t1.find(element => element.term == token).tfidf
    //         const value2 = t2.find(element => element.term == token).tfidf
    //         const value = parseFloat((value1 + value2).toFixed(2))

    //         if (link) {
    //             link.value += value
    //             link.tokens[token] = value
    //         } else {
    //             const obj = {}
    //             obj.source = id1
    //             obj.target = id2
    //             obj.value = value
    //             obj.tokens = {}
    //             obj.tokens[token] = value
    //             links.push(obj)
    //         }

    //     })
    // }

    // Normalizing values between [0,1]
    // const maxLinkValue = links.reduce((max, link) => max > link.value ? max : link.value, 0)
    // const minLinkValue = links.reduce((min, link) => min < link.value ? min : link.value, 100000)
    // links.forEach(link => link.value = parseFloat((link.value / maxLinkValue).toFixed(2)))



    //
    // Report and file writing
    //

    const format = x => JSON.stringify(x).length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    console.log(`     nodes.json : ${format(nodes)}kb for ${nodes.length} authors`)
    // console.log(`     links.json : ${format(links)}kb for ${links.length} links`)
    // console.log(`   maxLinkValue : ${maxLinkValue}`)
    // console.log(`   minLinkValue : ${minLinkValue}`)
    // console.log(`maxCommonTokens : ${maxCommonTokens}`)

    fs.writeFile('./src/data/nodes.json', JSON.stringify(nodes), err => { if (err) throw err })
    // fs.writeFile('./src/data/links.json', JSON.stringify(links), err => { if (err) throw err })
    fs.writeFile('./data/nodes.json', JSON.stringify(nodes, null, '\t'), err => { if (err) throw err })
    // fs.writeFile('./data/links.json', JSON.stringify(links, null, '\t'), err => { if (err) throw err })



    //
    // END
    //



})
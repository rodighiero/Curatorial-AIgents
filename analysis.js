const fs = require('fs')
const natural = require('natural')
const sw = require('stopword')

const reuse = require('d3-force-reuse')
const d3 = require('d3')

// Time counter

const start = Date.now()

let nodes = []
const links = []

const length = 250000

for (let i = 0; i < length; i++) {
    nodes.push({
        index: i
    })
}

console.log('\nSimulation starts\n')

const simulation = d3.forceSimulation()

simulation
    // .force('charge', reuse.forceManyBodyReuse()
    //     .strength(10)
    // )
    // .force('collide', d3.forceCollide()
    //     .radius(10)
    //     .strength(.5)
    //     // .iterations(5)
    // )
    .force('center', d3.forceCenter(0, 0))

simulation
    .nodes(nodes)
    // .force('link', d3.forceLink()
    //     .id(d => d.id)
    //     .strength(d => d.value)
    // )
    // .force('link').links(links)

simulation
    .on('end', () => {
        writing(nodes, links)
    })


const writing = (nodes, links) => {

    nodes.forEach(node => {
        node.x = Math.round(node.x)
        node.y = Math.round(node.y)
        delete node.vx; delete node.vy
    })

    // Writing files

    fs.writeFile('./src/data/nodes.json', JSON.stringify(nodes), err => { if (err) throw err })
    fs.writeFile('./data/nodes.json', JSON.stringify(nodes, null, '\t'), err => { if (err) throw err })
    fs.writeFile('./src/data/links.json', JSON.stringify(links), err => { if (err) throw err })
    fs.writeFile('./data/links.json', JSON.stringify(links, null, '\t'), err => { if (err) throw err })

    // Final report

    const format = x => JSON.stringify(x).length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    console.log('\n')
    console.log(`     nodes.json : ${format(nodes)}kb for ${nodes.length} nodes`)
    console.log(`     links.json : ${format(links)}kb for ${links.length} links`)

    // Time end

    const end = Date.now()
    const d = new Date(end - start)
    console.log(`\nTime computed ${d.getUTCHours()}h ${d.getUTCMinutes()}m ${d.getUTCSeconds()}s ${d.getUTCMilliseconds()}ms\n`)

}


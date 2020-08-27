// CSS

import '../node_modules/normalize.css/normalize.css'
import './constant/index.css'

// Files

import nodesJSON from './data/nodes.json'
import linksJSON from './data/links.json'
import imagesTXT from './data/images.txt'
import arialXML from './constant/arial.xml'


// Libraries

import { json, xml, text } from 'd3-fetch'

import pixi from './elements/pixi.js'

// Start

Promise.all([

    json(nodesJSON),
    json(linksJSON),
    xml(arialXML),
    text(imagesTXT)

]).then(([nodes, links, arial, images]) => {

    images = images.split(',')

    console.log('nodes', nodes.length)
    console.log('links', links.length)
    console.log('images', images.length)

    pixi(nodes, links, arial, images)

})
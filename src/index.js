// CSS

import '../node_modules/normalize.css/normalize.css'
import './constant/index.css'

// Data

import nodesJSON from './data/nodes.json'
import linksJSON from './data/links.json'

import arialXML from './constant/arial.xml'

// Libraries

import { json, xml } from 'd3-fetch'

import fps from './elements/fps.js'
import drawNodes from './draw/nodes.js'
import pixi from './elements/pixi.js'

// Start

Promise.all([
    json(nodesJSON),
    json(linksJSON),
    xml(arialXML)

]).then(([nodes, links, arialXML]) => {

    console.log('nodes', nodes.length)
    console.log('links', links.length)
    
    fps()
    
    const viewport = pixi(nodes, links, arialXML)
    
    drawNodes(viewport, nodes)

})
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import arialDataPNG from '../constant/arial.png'
import { scaleLinear } from 'd3-scale'
import { extent } from "d3-array"

// pixi.js

export default (nodes, links, arialXML) => {

    // Font

    const arialPNG = PIXI.Texture.from(arialDataPNG)
    PIXI.BitmapFont.install(arialXML, arialPNG)

    // Parameters
    
    // const screenWidth = 3840
    // const screenHeight = 1080
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    
    // Create app

    const app = new PIXI.Application({
        width: screenWidth,
        height: screenHeight,
        antialias: false,
        transparent: false,
        resolution: 1,
        autoDensity: true,
        autoResize: true,
        resizeTo: window,
        backgroundColor: 0x000000,
    })

    document.body.prepend(app.view)

    // Create viewport

    const viewport = new Viewport({
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        interaction: app.renderer.plugins.interaction
    })

    app.stage.addChild(viewport)

    // Settings

    const extX = extent(nodes, d => d.x)
    const extY = extent(nodes, d => d.y)
    const width = extX[1] - extX[0]
    const height = extY[1] - extY[0]
    const scaleX = window.innerWidth / width
    const scaleY = window.innerHeight / height
    const scale = scaleX < scaleY ? scaleX : scaleY
    const zoomMin = scale
    const zoomMax = 100

    const zoomOut = scaleLinear().domain([zoomMin, 2]).range([1, 0])
    const zoomIn = scaleLinear().domain([zoomMin, 2]).range([0, 1])

    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()
        .clampZoom({ minScale: zoomMin, maxScale: zoomMax })
        .setTransform(window.innerWidth / 2, window.innerHeight / 2, zoomMin, zoomMin)

    // Transparency on zoom

    // viewport.on('zoomed', e => {
    //     const scale = e.viewport.lastViewport.scaleX
        // 0. Background 1. Links 2. Contours 3. Keywords 4. Nodes 5. Wordclouds
        // e.viewport.children[2].alpha = zoomOut(scale)
        // e.viewport.children[3].alpha = zoomOut(scale)
        // e.viewport.children[5].alpha = zoomIn(scale)
    // })

    // Prevent pinch in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault()
    }, { passive: false })

    // Resize

    window.onresize = function () {
        viewport.resize()
    }

    // return viewport

    return ([viewport, app])

}
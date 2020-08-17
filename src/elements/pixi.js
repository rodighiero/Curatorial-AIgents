import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import arialDataPNG from '../constant/arial.png'
import { scaleLinear } from 'd3-scale'
import { extent } from "d3-array"

// pixi.js

export default (nodes, links, arialXML, imagesArray) => {

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

    const container = new PIXI.Container();

    app.stage.addChild(container);

    const scale = 1
    
    for (const node of nodes)
        draw(node)

    async function draw(node) {
        const address = await '../src/16images/' + imagesArray[node.index]
        const texture = await PIXI.Texture.from(address)
        const sprite = await new PIXI.Sprite(texture)
        sprite.setTransform(node.x, node.y, scale, scale)
        container.addChild(sprite)
        console.log(node.index)
    }

    const download_sprite_as_png = () => {
        app.renderer.extract.canvas(container).toBlob(function(b){
            var a = document.createElement('a');
            document.body.append(a);
            a.download = 'screenshot.png';
            a.href = URL.createObjectURL(b);
            a.click();
            a.remove();
        }, 'image/png');
    }

    window.print = download_sprite_as_png

    // return

    // Create viewport

    const viewport = new Viewport({
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        interaction: app.renderer.plugins.interaction
    })

    // app.stage.addChild(viewport)

    // // Settings

    // const extX = extent(nodes, d => d.x)
    // const extY = extent(nodes, d => d.y)
    // const width = extX[1] - extX[0]
    // const height = extY[1] - extY[0]
    // const scaleX = window.innerWidth / width
    // const scaleY = window.innerHeight / height
    // const scale = scaleX < scaleY ? scaleX : scaleY
    // const zoomMin = scale
    // const zoomMax = 100

    // const zoomOut = scaleLinear().domain([zoomMin, 2]).range([1, 0])
    // const zoomIn = scaleLinear().domain([zoomMin, 2]).range([0, 1])

    // viewport
    //     .drag()
    //     .pinch()
    //     .wheel()
    //     .decelerate()
    //     .clampZoom({ minScale: zoomMin, maxScale: zoomMax })
    //     .setTransform(window.innerWidth / 2, window.innerHeight / 2, zoomMin, zoomMin)

    // // Transparency on zoom

    // // viewport.on('zoomed', e => {
    // //     const scale = e.viewport.lastViewport.scaleX
    // // 0. Background 1. Links 2. Contours 3. Keywords 4. Nodes 5. Wordclouds
    // // e.viewport.children[2].alpha = zoomOut(scale)
    // // e.viewport.children[3].alpha = zoomOut(scale)
    // // e.viewport.children[5].alpha = zoomIn(scale)
    // // })

    // // Prevent pinch in Chrome

    // window.addEventListener('wheel', e => {
    //     e.preventDefault()
    // }, { passive: false })

    // // Resize

    // window.onresize = function () {
    //     viewport.resize()
    // }

    // return viewport

    return ([viewport, app])

}
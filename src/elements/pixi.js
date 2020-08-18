import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import arialDataPNG from '../constant/arial.png'
import { scaleLinear } from 'd3-scale'
import { extent } from "d3-array"

// pixi.js

export default (nodes, links, arialXML, imagesArray) => {


    // Font

    const png = PIXI.Texture.from(arialDataPNG)
    PIXI.BitmapFont.install(arialXML, png)


    // Parameters

    // const screenWidth = 3840, screenHeight = 1080
    const screenWidth = window.innerWidth, screenHeight = window.innerHeight



    // Create PixiJS app

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



    // Viewport

    const nodeScale = 1
    const networkScale = 1.4

    const extX = extent(nodes, d => d.x * networkScale)
    const extY = extent(nodes, d => d.y * networkScale)
    const nodesWidth = extX[1] - extX[0]
    const nodesHeight = extY[1] - extY[0]
    const scaleX = screenWidth / nodesWidth * .8
    const scaleY = screenWidth / nodesHeight * .8
    const scale = scaleX < scaleY ? scaleX : scaleY
    const zoomMin = scale
    const zoomMax = 100

    const viewport = new Viewport({
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        interaction: app.renderer.plugins.interaction
    })

    viewport.drag().pinch().wheel().decelerate()
        .clampZoom({ minScale: zoomMin, maxScale: zoomMax })
        .setTransform(window.innerWidth / 2, window.innerHeight / 2, zoomMin, zoomMin)

    app.stage.addChild(viewport)



    // Draw nodes


    for (const node of nodes) draw(node)
    async function draw(node) {
        const address = await '../src/16images/' + imagesArray[node.index]
        const texture = await PIXI.Texture.from(address)
        const sprite = await new PIXI.Sprite(texture)
        sprite.setTransform(
            node.x * networkScale, node.y * networkScale,
            nodeScale, nodeScale)
        viewport.addChild(sprite)
    }



    // Prevent pinch in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault()
    }, { passive: false })



    // Resize

    window.onresize = function () {
        viewport.resize()
    }



    // Vieport print

    const download_sprite_as_png = () => {
        app.renderer.extract.canvas(viewport).toBlob(function (b) {
            var a = document.createElement('a');
            document.body.append(a);
            a.download = 'screenshot.png';
            a.href = URL.createObjectURL(b);
            a.click();
            a.remove();
        }, 'image/png');
    }
    window.print = download_sprite_as_png



}
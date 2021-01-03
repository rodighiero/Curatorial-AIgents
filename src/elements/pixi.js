import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import arialDataPNG from '../constant/arial.png'
import { scaleLinear } from 'd3-scale'
import { extent } from "d3-array"
import * as ml5 from 'ml5'




// pixi.js

export default (nodes, links, arialXML, imagesArray) => {



    ////////////////////
    // Config
    ////////////////////

    const spriteScale = 1
    const networkScale = 16

    PIXI.BitmapFont.install(arialXML, PIXI.Texture.from(arialDataPNG))


    ////////////////////
    // Create PixiJS app
    ////////////////////

    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        transparent: true,
        resolution: 2,
        autoDensity: true,
        autoResize: true,
        resizeTo: window,
    })

    document.body.prepend(app.view)



    ////////////////////
    // Viewport
    ////////////////////

    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        interaction: app.renderer.plugins.interaction
    })

    app.stage.addChild(viewport)

    viewport.setTransform(window.innerWidth / 2, window.innerHeight / 2)



    ////////////////////
    // Zoom
    ////////////////////

    const setZoom = () => {
        const filteredNodes = nodes.filter(node => node.visibility == true)
        const extX = extent(filteredNodes, d => d.x * networkScale)
        const extY = extent(filteredNodes, d => d.y * networkScale)
        const nodesWidth = extX[1] - extX[0]
        const nodesHeight = extY[1] - extY[0]
        const scaleX = window.innerWidth / nodesWidth * .8
        const scaleY = window.innerHeight / nodesHeight * .8
        const scale = scaleX < scaleY ? scaleX : scaleY
        const zoomMin = scale

        viewport.animate({
            scale: zoomMin,
            position: new PIXI.Point(0, 0),
            time: 1000,
            removeOnInterrupt: true,
        })
    }

    /**
         * ml5
        */

    const onModelReady = () => {
        const i = 0
        const imageSize = 1000
        const node = nodes[i]
        const address = 'https://ids.lib.harvard.edu/ids/view/' + imagesArray[node.index] + '?height=' + imageSize + '&width=' + imageSize
        const texture = PIXI.Texture.from(address)
        const sprite = new PIXI.Sprite(texture)
        const large = true

        const gotResults = (err, results) => {
            // console.log(results)
            results.forEach(line => {
                console.log(line)
            })
        }
        
        sprite.texture.baseTexture.on('loaded', () => {
            const source = sprite.texture.baseTexture.resource.source
            const prediction = classifier.predict(source, gotResults)

            sprite.setTransform(
                (node.x * networkScale) - sprite.width / 2,
                node.y * networkScale - sprite.height / 2,
                large ? 1 : 20,
                large ? 1 : 20)

            viewport.addChild(sprite)
            node.visibility = true
            // setZoom()

        })
    }

    const classifier = ml5.imageClassifier("MobileNet", onModelReady)

    return



    ////////////////////
    // Drawing
    ////////////////////

    const commas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    let j = 0

    const draw = (node) => {

        // const large = viewport.scale.x > .1
        const large = true


        const imageSize = large ? 500 : 10
        console.log(imageSize)

        const address = 'https://ids.lib.harvard.edu/ids/view/' + imagesArray[node.index] + '?height=' + imageSize + '&width=' + imageSize
        const texture = PIXI.Texture.from(address)
        const sprite = new PIXI.Sprite(texture)

        sprite.texture.baseTexture.on('loaded', () => {

            sprite.setTransform(
                (node.x * networkScale) - sprite.width / 2,
                node.y * networkScale - sprite.height / 2,
                large ? 1 : 20,
                large ? 1 : 20)

            viewport.addChild(sprite)
            node.visibility = true
            setZoom()
            j += 1
            document.getElementById("number").innerHTML = commas(j) + ' Artworks<br\>Out of ' + commas(nodes.length)
        })

    }

    let i = 0

    const loop = () => {
        setTimeout(() => {
            const node = nodes[i]
            node.visibility = true
            draw(node)
            i++
            loop()
        }, 100)
    }

    loop()









    ////////////////////
    // Draw single image (not working for large size)
    ////////////////////

    // async function draw() {
    //     const address = await '../src/constant/screenshot.png'
    //     // const address = await '../src/constant/screenshot.jpg'
    //     // const address = await '../src/16images/9703848'
    //     const texture = await PIXI.Texture.from(address)
    //     const sprite = await new PIXI.Sprite(texture)
    //     sprite.x = -sprite.width / 2
    //     // sprite.setTransform(
    //     //     , 0,
    //     //     100000, 100000)
    //     viewport.addChild(sprite)
    // }

    // draw()



    ////////////////////
    // Draw nodes one by one (actually working)
    ////////////////////

    // for (const node of nodes) {
    //     draw(node)
    // }

    // const size = 10

    // async function draw(node) {
    //     const address = await 'https://ids.lib.harvard.edu/ids/view/' + imagesArray[node.index] + '?height=' + size + '&width=150' + size
    //     // const address = await '../src/16images/' + imagesArray[node.index]
    //     const texture = await PIXI.Texture.from(address)
    //     const sprite = await new PIXI.Sprite(texture)
    //     sprite.setTransform(
    //         (node.x - sprite.width / 2) * networkScale,
    //         (node.y - sprite.height / 2) * networkScale,
    //         nodeScale, nodeScale)
    //     viewport.addChild(sprite)
    // }



    ////////////////////
    // Vieport print
    ////////////////////

    // const download_sprite_as_png = () => {
    //     app.renderer.extract.canvas(viewport).toBlob(function (b) {
    //         var a = document.createElement('a');
    //         document.body.append(a);
    //         a.download = 'screenshot.png';
    //         a.href = URL.createObjectURL(b);
    //         a.click();
    //         a.remove();
    //     }, 'image/png');
    // }
    // window.print = download_sprite_as_png



    // Prevent pinch in Chrome

    window.addEventListener('wheel', e => {
        e.preventDefault()
    }, { passive: false })

    // Resize

    window.onresize = () => {
        viewport.resize()
    }



}
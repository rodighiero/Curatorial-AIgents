import * as PIXI from 'pixi.js'
import { image } from 'd3-fetch'

import { mouseover, mouseout } from '../elements/mouseover'

const color = {
    on: 0xFEDD00,
    off: 0xc7d1c2,
}

PIXI.BitmapFont.from('NodeFont', {
    fontFamily: 'Arial',
    fontSize: 21,
    fill: color.off,
})

export default (viewport, nodes, imagesArray) => {

    const start = Date.now() // Time counter

    const stage = new PIXI.Container()
    stage.interactiveChildren = false
    stage.tint = color.off

    viewport.addChild(stage)

    const scale = .4

    async function draw() {
        for (const node of nodes) {
            const address = await '../src/32images/' + imagesArray[node.index]
            const texture = await PIXI.Texture.from(address)
            const sprite = new PIXI.Sprite(texture)
            sprite.setTransform(node.x, node.y, scale, scale)
            stage.addChild(sprite)
            console.log(node.index)
        }
    }

    draw()

    const d = new Date(Date.now() - start)
    console.log(`\nTime computed ${d.getUTCHours()}h ${d.getUTCMinutes()}m ${d.getUTCSeconds()}s ${d.getUTCMilliseconds()}ms\n`)





    // nodes.forEach((node, i) => {

    //     const scale = .4

    //     // const address = 'https://ids.lib.harvard.edu/ids/view/' + imagesArray[i] + '?width=32&height=32'
    //     const address = '../src/32images/' + imagesArray[i]
    //     const texture = PIXI.Texture.from(address)
    //     const sprite = new PIXI.Sprite(texture)
    //     sprite.setTransform(node.x, node.y, scale, scale)

    //     stage.addChild(sprite)



    // })

}
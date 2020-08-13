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
    stage.tint = color.off

    viewport.addChild(stage)


    nodes.forEach((node, i) => {

        const scale = .1

        const address = 'https://ids.lib.harvard.edu/ids/view/' + imagesArray[i] + '?width=100&height=100'
        const texture = PIXI.Texture.from(address)
        const sprite = new PIXI.Sprite(texture)
        sprite.setTransform(node.x, node.y, scale, scale)

        stage.addChild(sprite)

        // if (i == nodes.length - 1) {
        //     const d = new Date(Date.now() - start)
        //     console.log(`\nTime computed ${d.getUTCHours()}h ${d.getUTCMinutes()}m ${d.getUTCSeconds()}s ${d.getUTCMilliseconds()}ms\n`)
        // }

    })

}
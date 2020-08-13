import * as PIXI from 'pixi.js'

import { mouseover, mouseout } from '../elements/mouseover'

const splitInTwo = string => {
    const middle = Math.round(string.length / 2)
    for (let i = middle, j = middle; i < string.length || j >= 0; i++, j--) {
        if (string[i] === ' ') return [string.substring(0, i), string.substring(i + 1)]
        if (string[j] === ' ') return [string.substring(0, j), string.substring(j + 1)]
    }
    return [string, '']
}

const color = {
    on: 0xFEDD00,
    off: 0xc7d1c2,
}

PIXI.BitmapFont.from('NodeFont', {
    fontFamily: 'Arial',
    fontSize: 21,
    fill: color.off,
})

export default (viewport, nodes) => {

    const stage = new PIXI.Graphics()
    stage.tint = color.off
    
    viewport.addChild(stage)

    nodes.forEach(node => {

        // Circle

        const size = 4

        stage.beginFill(color.off, 1)
        stage.drawCircle(node.x, node.y, size)
        stage.endFill()
        
    })

}
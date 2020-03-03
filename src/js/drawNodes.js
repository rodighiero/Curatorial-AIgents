import {
    s
} from './state'

const shift = 4

export default () => {

    const middleSpace = string => {
        const middle = Math.round(string.length / 2)
        for (let i = middle, j = middle; i < string.length || j >= 0; i++ , j--) {
            if (string[i] === ' ') return i
            if (string[j] === ' ') return j
        }
        return 0
    }

    // s.context.beginPath()
    s.context.fillStyle = s.colors.nodes
    // s.context.font = s.style.fontNodes
    // s.context.textAlign = 'center'

    s.nodes.forEach(node => {

        s.context.beginPath()
        s.context.arc(node.x, node.y, 5, 0, 2 * Math.PI);
        s.context.fill()

        // s.context.fill();

        // s.context.fillText(name, x, y - shift)

    })

    s.context.fill()

}
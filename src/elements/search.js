import autoComplete from '@tarekraafat/autocomplete.js'

export default () => {

    // Listner
    // document.querySelector("#autoComplete").addEventListener("autoComplete", event => {
    //     console.log(event)
    // })

    const placeholder = 'Search'

    // The autoComplete.js Engine instance creator

    const autoCompletejs = new autoComplete({
        data: {
            src: async () => {
                return s.nodes.reduce((array, { name, x, y }) => {

                    array.push({
                        name: name,
                        x: x,
                        y: y
                    })

                    return array
                }, [])
            },
            key: ["name"],
            // key: ["food", "cities", "animals"],
            cache: false
        },
        sort: (a, b) => {
            if (a.match < b.match) return -1
            if (a.match > b.match) return 1
            return 0
        },
        placeHolder: placeholder,
        selector: "#autoComplete",
        threshold: 0,
        debounce: 0,
        // searchEngine: "strict",
        searchEngine: "loose",
        highlight: true,
        maxResults: 10,
        resultsList: {
            render: true,
            container: source => {
                source.setAttribute("id", "autoComplete_list")
            },
            destination: document.querySelector("#autoComplete"),
            position: "afterend",
            element: "ul"
        },
        resultItem: {
            content: (data, source) => {
                source.innerHTML = data.match
            },
            element: "li"
        },
        noResults: () => {
            const result = document.createElement("li")
            result.setAttribute("class", "no_result")
            result.setAttribute("tabindex", "1")
            result.innerHTML = "No Results"
            document.querySelector("#autoComplete_list").appendChild(result)
        },
        onSelection: feedback => {

            console.log(feedback)

            const key = feedback.selection.key
            const node = feedback.selection.value
            const { x, y, name } = node

            document.querySelector("#autoComplete").value = name

            const scale = 5

            s.pixi.setTransform(
                window.innerWidth / 2 - x * scale,
                (window.innerHeight) / 2 - y * scale,
                scale, scale)


            // Transparency on zoom
            // 0. Background 1. Links 2. Contours 3. Keywords 4. Nodes 5. Wordclouds
            s.pixi.children[2].alpha = 0
            s.pixi.children[3].alpha = 0
            s.pixi.children[5].alpha = 1


            // const duration = 3000

            // const zoomin = () => {
            //     s.pixi.snap(x, y, {
            //         time: duration,
            //         ease: 'easeOutSine',
            //         removeOnComplete: true,
            //     })
            //     s.pixi.snapZoom({
            //         width: 100,
            //         time: duration,
            //         ease: 'easeInSine',
            //         removeOnComplete: true,
            //         noMove: true,
            //     })
            // }

            // const zoomout = () => {
            //     s.pixi.snap(x, y, {
            //         time: duration * 2,
            //         ease: 'easeOutSine',
            //         removeOnComplete: true,
            //     })
            //     s.pixi.snapZoom({
            //         width: 1000,
            //         time: duration,
            //         ease: 'easeOutSine',
            //         removeOnComplete: true,
            //         noMove: true,
            //     })
            //     setTimeout(() => {
            //         s.pixi.snapZoom({
            //             width: 100,
            //             time: duration,
            //             ease: 'easeInSine',
            //             removeOnComplete: true,
            //             noMove: true,
            //         })
            //     }, duration)
            // }

            // Click

            // if (s.pixi.scale.x < 1) zoomin()
            // else zoomout()

        }
    })

}
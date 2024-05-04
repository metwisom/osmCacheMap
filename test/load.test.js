const http = require("http")

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(() => {
    const z = random(0, 17)
    const x = random(0,Math.pow(2,z) - 1)
    const y = random(0,Math.pow(2,z) - 1)
    http.get(`http://localhost:3030/tiles/${z}/${x}/${y}.png`)
},100)


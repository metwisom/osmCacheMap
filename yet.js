const steal_tile = require('./stealer');
const fs = require('fs');

const count_of_threads = 1;

let level_marks = {
    13: [4779, 15, 2371, 17],
    14: [9559, 29, 4743, 34],
    15: [19118, 58, 9487, 67],
    16: [38236, 89, 18975, 134],
    17: [76473, 232, 37951, 268],
    18: [152946, 464, 75902, 536]
}

let marks = [];

for (let level in level_marks) {
    let [sx, ax, sy, ay] = level_marks[level];
    for (let x = sx; x <= sx + ax; x++) {
        for (let y = sy; y <= sy + ay; y++) {
            marks.push(`/${level}/${x}/${y}.png`);
        }
    }
}

/*

(async () => {

    let iter = 1;
    for (let line of marks) {
        await new Promise((resolve, reject) => {
            if (fs.existsSync(`./cache${line}`)) {
                fs.stat(`./cache${line}`, (er, e) => {
                    if (e.size == 552 || e.size == 562  || e.size == 285  || e.size == 0) {
                        console.log(`delete cache${line}`)
                        fs.unlink(`./cache${line}`, (err) => { return resolve() });
                    } else {
                        return resolve()
                    }
                })
            } else {
                return resolve()
            }
        })
    }

})()

*/


let subarray = [];
let one_size = Math.ceil(marks.length / count_of_threads);
for (let i = 0; i < count_of_threads; i++) {
    subarray[i] = marks.slice(i * one_size, i * one_size + one_size);
}

console.log(`Total tiles: ${marks.length}`);
let total = 0;

const stealing = async (data) => {
    for (let i in data) {
        let value = data[i];
        path = value.split('/');
        path.pop()
        path = path.join('/');
        await steal_tile(path, value);
        console.log(`${(~~total++ + 1)}/${marks.length}`);
    }
}

subarray.forEach(data => stealing(data))

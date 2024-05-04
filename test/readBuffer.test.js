const {expect, test} = require("@jest/globals")

const {readBuffer} = require("../dist/helpers/readBuffer")

test("readBuffer success", () => {
    return readBuffer("./package.json")
        .then((file) => {
            expect(Buffer.isBuffer(Buffer.from(file))).toBeTruthy()
        })
})

test("readBuffer fail", () => {
    return readBuffer("../package.json")
        .catch(err => {
            expect(err).toEqual("tile not found on disk")
        })
})
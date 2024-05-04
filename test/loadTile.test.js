const {expect,test} = require('@jest/globals')

const {loadTile} = require('../dist/tile/loadTile');

test('build has version', () => {
    return loadTile("10/596","10/596/296.png")
        .then(file => {
            const isFile = Buffer.isBuffer(file)
            expect(isFile).toBeTruthy()
        })

});

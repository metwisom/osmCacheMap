const {expect,test} = require('@jest/globals')

const {tileWorker, clearCache} = require('../dist/tile/tileWorker');
const {Status} = require('../dist/helpers/statuses');

test('tileWorker on online', () => {
    Status.currentStatus = 'online'
    return tileWorker("10/596","10/596/296.png")
        .then(file => {
            const isFile = Buffer.isBuffer(file)
            expect(isFile).toBeTruthy()
        })
});

test('tileWorker on offline', () => {
    clearCache()
    Status.currentStatus = 'offline'
    return tileWorker("10/596","10/596/296.png")
        .then(file => {
            const isFile = Buffer.isBuffer(file)
            expect(isFile).toBeTruthy()
        })
});

test('tileWorker on offline with error', () => {
    clearCache()
    Status.currentStatus = 'offline'
    return tileWorker("10/596","10/596/-296.png")
        .then(file => {
            const isFile = Buffer.isBuffer(file)
            expect(isFile).toBeTruthy()
        })
});

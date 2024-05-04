const {expect,test} = require('@jest/globals')

const {favicon} = require('../dist/helpers/favicon');

test('has favicon', () => {
    expect(Buffer.isBuffer(Buffer.from(favicon))).toBeTruthy();
});

const {expect,test} = require('@jest/globals')

const {Build} = require('../dist/helpers/build');

test('build has version', () => {
    expect(Build).toHaveProperty('version');
});

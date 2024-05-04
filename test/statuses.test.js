const {expect, test} = require("@jest/globals")

const {Status} = require("../dist/helpers/statuses")

test("status has property", () => {
    expect(Status).toHaveProperty('currentStatus')
})

test("status false default", () => {
    expect(Status.currentStatus).toEqual('offline')
})

test("status set true", () => {
    Status.currentStatus = 'online'
    expect(Status.currentStatus).toEqual('online')
})

test("status set false", () => {
    Status.currentStatus = 'offline'
    expect(Status.currentStatus).toEqual('offline')
})
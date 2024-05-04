const {expect, test} = require("@jest/globals")

const {Config} = require("../dist/helpers/config")

test("build is valid", () => {
    expect(Config).toHaveProperty("HTTP_PORT")
    expect(Config).toHaveProperty("CACHE_FOLDER")
    expect(Config).toHaveProperty("HOSTS")
})
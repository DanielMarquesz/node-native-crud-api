const assert = require("assert")
const { getOneProductController } = require('./index')

const requestMock = {
  params: 1
}

const responseMock = {
  end: (func) => func
}

const result = getOneProductController(requestMock, responseMock)
assert.strictEqual(result, JSON.stringify({ "id": 1, "name": "truck", "size": "medium", "available": true }))

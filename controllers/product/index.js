const http = require("http")
const { IProducts } = require("../../models/IProducts")

const products = [
  {
    id: 1,
    name: "truck",
    size: "medium",
    available: true
  },
  {
    id: 2,
    name: "plane",
    size: "large",
    available: false
  }
]

/**
*  @param {http.IncomingMessage} req
*  @param {http.ServerResponse} res
*  @return {IProducts} product
*/
const getOneProductController = (req, res) => {
  const id = req.params
  const product = products.find((product) => product.id === Number(id))
  res.statusCode = 200
  return res.end(JSON.stringify(product))
}

/**
*  @param {http.IncomingMessage} req
*  @param {http.ServerResponse} res
*/
const getProductController = (req, res) => {
  res.statusCode = 200
  return res.end(JSON.stringify(products))
}

/**
*  @param {http.IncomingMessage} req
*  @param {http.ServerResponse} res
*/
const createProductController = (req, res) => {
  let data = ""

  req.on('data', chunk => {
    data += chunk.toString()
  })

  req.on('end', () => {
    try {
      const productData = JSON.parse(data)

      products.push(productData)

      return res.end(JSON.stringify(productData));
    } catch (error) {
      console.log(error)
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid JSON data');
    }
  })
}

/**
*  @param {http.IncomingMessage} req
*  @param {http.ServerResponse} res
*/
const updateProductController = (req, res) => {
  let data = ""

  req.on('data', chunk => {
    data += chunk.toString()
  })

  req.on('end', () => {
    try {
      const productData = JSON.parse(data)

      const pathParameter = urlPath.split('/')[2];
      const productIndex = products.findIndex(product => product.id === Number(pathParameter))

      products[productIndex] = { ...products[productIndex], ...productData }

      return res.end(JSON.stringify(productData));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid JSON data');
    }
  })
}

/**
*  @param {http.IncomingMessage} req
*  @param {http.ServerResponse} res
*/
const deleteProductController = (req, res) => {
  const id = req.params
  const productIndex = products.findIndex(product => product.id === Number(id))

  products.splice(productIndex, 1)

  res.statusCode = 204
  return res.end();
}

module.exports = {
  getOneProductController,
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController
}
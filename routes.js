const http = require("http")
const url = require("url")

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
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */

const routes = (req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const urlPath = parsedUrl.pathname

  // Get one or many
  if (urlPath.startsWith("/products") && req.method === "GET") {

    const hasPathParameter = urlPath.split('/')[2];

    if (hasPathParameter) {
      const product = products.find((product) => product.id === Number(hasPathParameter))

      res.statusCode = 200
      return res.end(JSON.stringify(product))
    }

    res.statusCode = 200
    res.end(JSON.stringify(products))

  }

  // Create
  if (urlPath.startsWith("/products") && req.method === "POST") {
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
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON data');
      }
    })
  }

  // Update
  if (urlPath.startsWith("/products") && req.method === "PATCH") {
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

  // Delete
  if (urlPath.startsWith("/products") && req.method === "DELETE") {
    const pathParameter = urlPath.split('/')[2];

    const productIndex = products.findIndex(product => product.id === Number(pathParameter))

    products.splice(productIndex, 1)

    res.statusCode = 204
    return res.end();
  }
}

module.exports = routes
const http = require("http")
const url = require("url");
const { getOneProductController, getProductController, createProductController, updateProductController, deleteProductController } = require("./controllers/product");

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */

const routes = (req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const urlPath = parsedUrl.pathname
  req.params = urlPath.split('/')[2];

  if (urlPath.startsWith("/products") && req.method === "GET") {

    const hasPathParameter = urlPath.split('/')[2];

    if (hasPathParameter) {
      getOneProductController(req, res)
      return
    }

    getProductController(req, res)
    return
  }

  if (urlPath.startsWith("/products") && req.method === "POST") {
    createProductController(req, res)
    return
  }

  if (urlPath.startsWith("/products") && req.method === "PATCH") {
    updateProductController(req, res)
    return
  }

  if (urlPath.startsWith("/products") && req.method === "DELETE") {
    deleteProductController(req, res)
    return
  }
}

module.exports = routes
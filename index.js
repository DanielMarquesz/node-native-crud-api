const http = require('http');
const routes = require('./routes');

// Create a server instance
const server = http.createServer((req, res) => {

  routes(req, res)

  // End the response
  // res.end();
});

// Define the port the server will listen on
const port = 3000;

// Start the server and listen on the defined port
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

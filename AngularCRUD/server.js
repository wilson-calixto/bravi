const jsonServer = require("json-server");
// Import the library:
const cors = require("cors");

const server = jsonServer.create();

// Then use it before your routes are set up:
server.use(cors());
const middlewares = jsonServer.defaults({ noCors: true });

server.use(middlewares);

const router = jsonServer.router("db.json");

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

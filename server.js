import { breadcrumb } from "./controller";
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("database/dataset.json");
const middlewares = jsonServer.defaults();

const allowedMethods = ["GET", "PUT", "POST", "DELETE"];

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (!allowedMethods.includes(req.method)) {
    return res.send(405, "Method Not Allowed");
  }
  req.query._limit = req.query._limit || 100;
  next();
});

server.use("/breadcrumb", breadcrumb);

server.use("/", router);

server.listen(3002, () => {
  console.log("JSON Server is running from 3002 port");
});

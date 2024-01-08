import express from "express";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import __dirname from "./utils.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";

const server = express();

const port = 8080;
const ready = () => console.log("server ready on port:", port);
server.listen(port, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

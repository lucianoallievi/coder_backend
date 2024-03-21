import "dotenv/config.js";
import express from "express";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import dbConnection from "./src/utils/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { products } from "./src/data/mongo/manager.mongo.js";

const server = express();
const port = process.env.PORT || 8080;
const ready = () => {
  console.log("server ready on port:", port), dbConnection();
};
//server.listen(port, ready);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(port, ready);
socketServer.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("welcome", "Welcome to my e-commerce");
  socket.on("new product", async (product) => {
    try {
      await products.create(product);
      socket.emit("new success", "created");
    } catch (error) {
      console.log(error);
    }
  });
});

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

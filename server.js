import express from "express";
import users from "./data/fs/users.fs.js";
import products from "./data/fs/products.fs.js";

const server = express();

const port = 8080;
const ready = () => {
  console.log("server ready on port:", port);
};

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(port, ready);

server.get("/api/products", (req, res) => {
  try {
    const all = products.read();
    if (all.length) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        response: { succes: false, message: "not found" },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const product = products.readOne(pid);
    if (product) {
      return res.json({
        statusCode: 200,
        response: product,
      });
    } else {
      return res.json({
        statusCode: 404,
        response: { succes: false, message: "not found" },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/users", (req, res) => {
  try {
    const all = users.read();
    if (all.length) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        response: { succes: false, message: "not found" },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", (req, res) => {
  try {
    const { uid } = req.params;
    const user = users.readOne(uid);
    console.log(user);
    if (user) {
      return res.json({
        statusCode: 200,
        response: user,
      });
    } else {
      return res.json({
        statusCode: 404,
        response: { succes: false, message: "not found" },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

/*server.post("/api/users", (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    users.create(data);
    res.json({ statusCode: 201, message: "creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});
*/

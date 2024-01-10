import { Router } from "express";
import products from "../../data/fs/products.fs.js";

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
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
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

productsRouter.get("/:pid", (req, res) => {
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

productsRouter.delete("/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const product = products.destroy(pid);
    if (product) {
      return res.json({
        statusCode: 200,
        response: {
          success: true,
        },
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

productsRouter.post("/", (req, res) => {
  try {
    if (products.create(req.body)) {
      return res.json({
        statusCode: 201,
        response: { succes: true, message: "created" },
      });
    } else {
      return res.json({
        statusCode: 400,
        response: { succes: false, message: "bad request" },
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

productsRouter.put("/:pid", (req, res) => {
  const { pid } = req.params;
  try {
    if (products.update(pid, req.body)) {
      return res.json({
        statusCode: 200,
        response: { succes: true, message: "ok" },
      });
    } else {
      return res.json({
        statusCode: 400,
        response: { succes: false, message: "bad request" },
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

export default productsRouter;

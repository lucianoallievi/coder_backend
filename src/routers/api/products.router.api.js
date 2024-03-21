import { Router } from "express";
// import products from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";
const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
    };

    const all = await products.read({ filter });
    if (all.length) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return next();
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await products.readOne(pid);
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
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await products.destroy(pid);
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
    return next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    if (await products.create(req.body)) {
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
    return next(error);
  }
});

productsRouter.put("/:pid", async (req, res, next) => {
  const { pid } = req.params;
  try {
    if (await products.update(pid, req.body)) {
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
    return next(error);
  }
});

export default productsRouter;

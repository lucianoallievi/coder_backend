import { Router } from "express";
// import orders from "../../data/fs/orders.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
const orderRouter = Router();

orderRouter.get("/", async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }
    const all = await orders.read({ filter });
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
    return next(error);
  }
});

orderRouter.get("/:uid", async (req, res, next) => {
  const { uid } = req.params;
  try {
    const all = await orders.readOne(uid);
    if (all.length) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return next(error);
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});
orderRouter.delete("/:uid", async (req, res, next) => {
  const { uid } = req.params;
  try {
    const all = await orders.destroy(uid);
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
    return next(error);
  }
});

orderRouter.post("", async (req, res, next) => {
  try {
    if (await orders.create(req.body)) {
      return res.json({
        statusCode: 200,
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

export default orderRouter;

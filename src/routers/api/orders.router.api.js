import { Router } from "express";
import orders from "../../data/fs/orders.fs.js";

const orderRouter = Router();

orderRouter.get("/", (req, res) => {
  try {
    const all = orders.read();
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

orderRouter.get("/:uid", (req, res) => {
  const { uid } = req.params;
  try {
    const all = orders.readOne(uid);
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

orderRouter.post("", (req, res) => {
  try {
    if (orders.create(req.body)) {
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
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

export default orderRouter;

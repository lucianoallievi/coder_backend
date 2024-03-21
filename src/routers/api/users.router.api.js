import { Router } from "express";
// import users from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";
const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    let filter = {};
    let all;
    if (req.query.email) {
      filter = { email: req.query.email };
      all = await users.readByEmail({ filter });
    } else {
      all = await users.read({ filter });
    }

    if (all.length) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return next(error);
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await users.readOne(uid);
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
    return next(error);
  }
});
usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await users.destroy(uid);
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
    return next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    await users.create(data);
    res.json({ statusCode: 201, message: "creado correctamente" });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;

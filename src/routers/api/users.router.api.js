import { Router } from "express";
import users from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
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

usersRouter.get("/:uid", (req, res) => {
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

usersRouter.post("/", (req, res) => {
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

export default usersRouter;

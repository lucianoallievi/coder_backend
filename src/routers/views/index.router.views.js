import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = ["medias", "zapatillas", "telefono"];
    const date = new Date();
    return res.render("index", { products: mainProducts, date });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/real", (req, res, next) => {
  try {
    return res.render("real", {});
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;

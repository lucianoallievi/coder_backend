import { Router } from "express";
import apiRouter from "./api/index.router.api.js";
import viewsRouter from "./views/index.router.views.js";

const router = Router();

router.use("/", viewsRouter);
router.use("/api", apiRouter);

export default router;

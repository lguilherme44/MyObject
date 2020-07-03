import { Router } from "express";

import RastreioController from "./controllers/RastreioController";

const router = new Router();

router.get("/:codigo", RastreioController.show);

export default router;

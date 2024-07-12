import { Router } from "express";
import { getTiposMarcos } from "../controllers/utils.controller.js";

const router = Router();

router.get("/", getTiposMarcos);

export default router;
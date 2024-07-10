import { Router } from "express";
import { getMarcos, postMarco, deleteMarco, getMarco, patchMarco } from "../controllers/marcos.controller.js";

const router = Router();

router.get("/", getMarcos);
router.post("/", postMarco);
router.get("/:id", getMarco); 
router.patch("/:id", patchMarco);
router.delete("/:id", deleteMarco);

export default router;
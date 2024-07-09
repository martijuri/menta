import { Router } from "express";
import { getTransacciones, postTransaccion, getTransaccion, patchTransaccion, deleteTransaccion} from "../controllers/transacciones.controller.js";

const router = Router();

router.get("/", getTransacciones);
router.post("/", postTransaccion);
router.get("/:id", getTransaccion);
router.patch("/:id", patchTransaccion);
router.delete("/:id", deleteTransaccion);

export default router;

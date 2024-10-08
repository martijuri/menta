import { Router } from "express";
import { postUsuario, getUsuario, patchUsuario, deleteUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.post("/", postUsuario);
router.get("/:id", getUsuario);
router.patch("/:id", patchUsuario);
router.delete("/:id", deleteUsuario);

export default router;
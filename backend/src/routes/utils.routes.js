import { Router } from "express";
import { getTiposMarcos, getPedidos, getVentas, getTipoMarco } from "../controllers/utils.controller.js";

const router = Router();

router.get("/tipos", getTiposMarcos);
router.get("/tipos/:id", getTipoMarco);
router.get("/pedidos", getPedidos);
router.get("/ventas", getVentas);


export default router;
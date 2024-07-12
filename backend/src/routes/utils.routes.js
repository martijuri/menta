import { Router } from "express";
import { getTiposMarcos, getPedidos, getVentas } from "../controllers/utils.controller.js";

const router = Router();

router.get("/tipos", getTiposMarcos);
router.get("/pedidos", getPedidos);
router.get("/ventas", getVentas);


export default router;
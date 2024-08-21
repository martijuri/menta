import { Router } from "express";
import { getTiposMarcos, getPedidos, getVentas, getTipoMarco, getCuentas, patchCuenta, postCuenta } from "../controllers/utils.controller.js";

const router = Router();

router.get("/tipos", getTiposMarcos);
router.get("/tipos/:id", getTipoMarco);
router.get("/pedidos", getPedidos);
router.get("/ventas", getVentas);
router.get("/cuentas", getCuentas);
router.patch("/cuentas/:id", patchCuenta);
router.post("/cuentas", postCuenta);


export default router;
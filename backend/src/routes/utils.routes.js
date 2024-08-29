import { Router } from "express";
import { getTiposMarcos, getPedidos, getVentas, getTipoMarco, getCuentas, patchCuenta, postCuenta } from "../controllers/utils.controller.js";
import { getItemsTransaccion, getItemTransaccion ,postItemTransaccion, deleteItemTransaccion, patchItemTransaccion, postItemsTransaccion } from "../controllers/transacciones.controller.js";

const router = Router();

router.get("/tipos", getTiposMarcos);
router.get("/tipos/:id", getTipoMarco);
router.get("/pedidos", getPedidos);
router.get("/ventas", getVentas);
router.get("/cuentas", getCuentas);
router.patch("/cuentas/:id", patchCuenta);
router.post("/cuentas", postCuenta);
router.get("/items/:id", getItemsTransaccion);
router.get("/item/:id", getItemTransaccion);
router.post("/item", postItemTransaccion);
router.post("/items", postItemsTransaccion);
router.delete("/item/:id", deleteItemTransaccion);
router.patch("/item/:id", patchItemTransaccion);


export default router;
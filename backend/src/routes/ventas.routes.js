import { Router } from "express";
import {
    obtenerVentas,
    crearVenta,
    actualizarVenta,
    eliminarVenta
} from "../controllers/ventas.controller.js";

const router = Router();

router.get("/", obtenerVentas);
router.post("/", crearVenta);
router.put("/:id", actualizarVenta);
router.delete("/:id", eliminarVenta);

export default router;
import { Router } from "express";
import {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from "../controllers/proveedores.controller.js";

const router = Router();

router.get("/", obtenerProveedores);
router.post("/", crearProveedor);
router.put("/:rut", actualizarProveedor);
router.delete("/:rut", eliminarProveedor);

export default router;
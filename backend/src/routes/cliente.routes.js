import { Router } from "express";
import { 
    obtenerClientes, 
  crearCliente, 
  actualizarCliente, 
  eliminarCliente 
} from "../controllers/cliente.controller.js";

const router = Router();

router.get("/", obtenerClientes);
router.post("/", crearCliente);
router.put("/:rut", actualizarCliente);
router.delete("/:rut", eliminarCliente);

export default router;
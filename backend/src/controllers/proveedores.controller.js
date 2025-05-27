import { prisma } from '../prisma/client.js';

export const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await prisma.proveedor.findMany();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
};

export const crearProveedor = async (req, res) => {
  const { rut, nombre, direccion, telefono, paginaWeb } = req.body;
  try {
    const nuevoProveedor = await prisma.proveedor.create({
      data: {
        rut,
        nombre,
        direccion,
        telefono,
        paginaWeb
      }
    });
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear proveedor' });
  }
};

export const actualizarProveedor = async (req, res) => {
  const { rut } = req.params;
  const { nombre, direccion, telefono, paginaWeb } = req.body;
  try {
    const proveedorActualizado = await prisma.proveedor.update({
      where: { rut },
      data: { nombre, direccion, telefono, paginaWeb }
    });
    res.json(proveedorActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar proveedor' });
  }
};

export const eliminarProveedor = async (req, res) => {
  const { rut } = req.params;
  try {
    await prisma.proveedor.delete({ where: { rut } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proveedor' });
  }
};
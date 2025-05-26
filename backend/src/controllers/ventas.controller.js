import { prisma } from '../prisma/client.js';

// Obtener todas las ventas con sus detalles
export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await prisma.venta.findMany({
      include: {
        detalleVenta: true,
        cliente: true
      }
    });
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};

// Crear una nueva venta con detalles
export const crearVenta = async (req, res) => {
  const { clienteRut, fecha, descuento, total, detalleVenta } = req.body;

  try {
    const nuevaVenta = await prisma.venta.create({
      data: {
        clienteRut,
        fecha: fecha ? new Date(fecha) : undefined,
        descuento,
        total,
        detalleVenta: {
          create: detalleVenta // Array de objetos: { productoId, precioVenta, cantidad, subtotal }
        }
      },
      include: {
        detalleVenta: true
      }
    });
    res.status(201).json(nuevaVenta);
  } catch (error) {
    console.error('Error al crear la venta:', error);
    res.status(500).json({ error: 'Error al crear la venta' });
  }
};

// Actualizar una venta (no actualiza detalles)
export const actualizarVenta = async (req, res) => {
  const { id } = req.params;
  const { clienteRut, fecha, descuento, total } = req.body;

  try {
    const ventaActualizada = await prisma.venta.update({
      where: { id: Number(id) },
      data: {
        clienteRut,
        fecha: fecha ? new Date(fecha) : undefined,
        descuento,
        total
      }
    });
    res.json(ventaActualizada);
  } catch (error) {
    console.error('Error al actualizar la venta:', error);
    res.status(500).json({ error: 'Error al actualizar la venta' });
  }
};

// Eliminar una venta (y sus detalles por onDelete: Cascade)
export const eliminarVenta = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.venta.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la venta:', error);
    res.status(500).json({ error: 'Error al eliminar la venta' });
  }
};
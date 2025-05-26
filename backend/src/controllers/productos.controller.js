import { prisma } from '../prisma/client.js';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
  const { nombre, precioActual, stock, proveedorRut, categoriaId } = req.body;

  try {
    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        precioActual,
        stock,
        proveedorRut,
        categoriaId
      }
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Actualizar un producto existente
export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precioActual, stock, proveedorRut, categoriaId } = req.body;

  try {
    const productoActualizado = await prisma.producto.update({
      where: { id: Number(id) },
      data: {
        nombre,
        precioActual,
        stock,
        proveedorRut,
        categoriaId
      }
    });
    res.json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.producto.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
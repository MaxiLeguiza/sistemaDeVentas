import { prisma } from '../prisma/client.js';

// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: { productos: true }
    });
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

// Crear una nueva categoría
export const crearCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const nuevaCategoria = await prisma.categoria.create({
      data: {
        nombre,
        descripcion
      }
    });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

// Actualizar una categoría existente
export const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    const categoriaActualizada = await prisma.categoria.update({
      where: { id: Number(id) },
      data: {
        nombre,
        descripcion
      }
    });
    res.json(categoriaActualizada);
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

// Eliminar una categoría
export const eliminarCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.categoria.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};
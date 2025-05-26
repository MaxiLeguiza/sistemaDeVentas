import { prisma } from '../prisma/client.js';

export const obtenerClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: { telefonos: true, venta: true }
    });
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(404).json({ error: 'Error al obtener los clientes' });
  }
};

export const crearCliente = async (req, res) => {
  const { rut, nombre, calle, numero, comuna, ciudad, telefonos } = req.body;

  try {
    const nuevoCliente = await prisma.cliente.create({
      data: {
        rut,
        nombre,
        calle,
        numero,
        comuna,
        ciudad,
        telefonos: telefonos
          ? {
              create: telefonos.map((tel) => ({
                numero: tel.numero
              }))
            }
          : undefined
        // Las ventas se crean aparte, no aquí
      },
      include: { telefonos: true }
    });
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

export const actualizarCliente = async (req, res) => {
  const { rut } = req.params;
  const { nombre, calle, numero, comuna, ciudad, telefonos } = req.body;

  try {
    // Actualiza los datos básicos del cliente
    const clienteActualizado = await prisma.cliente.update({
      where: { rut },
      data: {
        nombre,
        calle,
        numero,
        comuna,
        ciudad
      }
    });

    // Si se envían teléfonos, primero elimina los existentes y luego crea los nuevos
    if (telefonos) {
      await prisma.telefonoCliente.deleteMany({ where: { clienteRut: rut } });
      await prisma.telefonoCliente.createMany({
        data: telefonos.map((tel) => ({
          numero: tel.numero,
          clienteRut: rut
        }))
      });
    }

    // Devuelve el cliente actualizado con sus teléfonos
    const clienteConTelefonos = await prisma.cliente.findUnique({
      where: { rut },
      include: { telefonos: true }
    });

    res.json(clienteConTelefonos);
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

export const eliminarCliente = async (req, res) => {
  const { rut } = req.params;

  try {
    await prisma.cliente.delete({
      where: { rut }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
};
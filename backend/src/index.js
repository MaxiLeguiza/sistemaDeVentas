import express from 'express';
import categoriasRoutes from './routes/categorias.routes.js';
import clientesRoutes from './routes/cliente.routes.js'; 
import productosRoutes from './routes/productos.routes.js';
import ventasRoutes from './routes/ventas.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/categorias', categoriasRoutes);
app.use('/clientes', clientesRoutes);
app.use('/productos', productosRoutes);
app.use('/ventas', ventasRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor en el puerto: ${PORT}`);
});
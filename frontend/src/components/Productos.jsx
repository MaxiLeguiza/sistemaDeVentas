import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

function Productos() {
  const [producto, setProducto] = useState({
    nombre: "",
    precioActual: "",
    stock: "",
    proveedorRut: "",
    categoriaId: "",
  });

  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/proveedores`)
      .then(res => res.json())
      .then(data => setProveedores(data));

    fetch(`${API_URL}/categorias`)
      .then(res => res.json())
      .then(data => setCategorias(data));

    fetchProductos();
  }, []);

  const fetchProductos = () => {
    fetch(`${API_URL}/productos`)
      .then(res => res.json())
      .then(data => setProductos(data));
  };

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productoData = {
        nombre: producto.nombre,
        precioActual: parseFloat(producto.precioActual),
        stock: parseInt(producto.stock),
        proveedorRut: producto.proveedorRut,
        categoriaId: parseInt(producto.categoriaId),
      };

      const response = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoData),
      });

      if (response.ok) {
        alert("Producto registrado correctamente");
        setProducto({
          nombre: "",
          precioActual: "",
          stock: "",
          proveedorRut: "",
          categoriaId: "",
        });
        fetchProductos();
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      alert("Error al registrar el producto: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <h2>Registrar Producto</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            name="nombre"
            placeholder="Nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
          <input
            name="precioActual"
            placeholder="Precio Actual"
            type="number"
            value={producto.precioActual}
            onChange={handleChange}
            required
          />
          <input
            name="stock"
            placeholder="Stock Disponible"
            type="number"
            value={producto.stock}
            onChange={handleChange}
            required
          />
          <select
            name="proveedorRut"
            value={producto.proveedorRut}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.rut} value={prov.rut}>
                {prov.nombre} ({prov.rut})
              </option>
            ))}
          </select>
          <select
            name="categoriaId"
            value={producto.categoriaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <button type="submit">Registrar</button>
        </div>
      </form>

      <div>
        <h3>Lista de Productos</h3>
        {productos.length === 0 ? (
          <p>No hay productos registrados</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>ID</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Nombre</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Precio</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Stock</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Proveedor</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prod.id}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prod.nombre}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prod.precioActual}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prod.stock}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prod.proveedorRut}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prod.categoriaId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Productos;
import React, { useState } from "react";

function Productos() {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    proveedor: "",
    categoria: "",
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Producto registrado: " + JSON.stringify(producto));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Registrar Producto</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="nombre" placeholder="Nombre" value={producto.nombre} onChange={handleChange} required />
        <input name="precio" placeholder="Precio Actual" type="number" value={producto.precio} onChange={handleChange} required />
        <input name="stock" placeholder="Stock Disponible" type="number" value={producto.stock} onChange={handleChange} required />
        <input name="proveedor" placeholder="Nombre del Proveedor" value={producto.proveedor} onChange={handleChange} required />
        <input name="categoria" placeholder="Categoría" value={producto.categoria} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </div>
    </form>
  );
}

export default Productos;
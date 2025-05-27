import React, { useState, useEffect } from "react";

function Productos() {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    proveedor: "",
    categoria: "",
  });

  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Reemplaza estos fetch simulados por tus endpoints reales
    // fetch("/api/proveedores").then(res => res.json()).then(data => setProveedores(data));
    // fetch("/api/categorias").then(res => res.json()).then(data => setCategorias(data));
    setProveedores([
      { id: "prov1", nombre: "Proveedor A" },
      { id: "prov2", nombre: "Proveedor B" },
    ]);
    setCategorias([
      { id: "cat1", nombre: "Electrónica" },
      { id: "cat2", nombre: "Ropa" },
    ]);
  }, []);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Producto registrado: " + JSON.stringify(producto));
    // Aquí puedes hacer el POST a tu backend
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
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
          name="precio"
          placeholder="Precio Actual"
          type="number"
          value={producto.precio}
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
          name="proveedor"
          value={producto.proveedor}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un proveedor</option>
          {proveedores.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.nombre}
            </option>
          ))}
        </select>
        <select
          name="categoria"
          value={producto.categoria}
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
  );
}

export default Productos;
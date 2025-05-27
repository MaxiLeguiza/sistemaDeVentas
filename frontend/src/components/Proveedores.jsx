import React, { useState } from "react";

function Proveedores() {
  const [proveedor, setProveedor] = useState({
    rut: "",
    nombre: "",
    direccion: "",
    telefono: "",
    web: "",
  });

  const handleChange = (e) => {
    setProveedor({ ...proveedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Proveedor registrado: " + JSON.stringify(proveedor));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Registrar Proveedor</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="rut" placeholder="RUT" value={proveedor.rut} onChange={handleChange} required />
        <input name="nombre" placeholder="Nombre" value={proveedor.nombre} onChange={handleChange} required />
        <input name="direccion" placeholder="Dirección" value={proveedor.direccion} onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono" value={proveedor.telefono} onChange={handleChange} required />
        <input name="web" placeholder="Página Web" value={proveedor.web} onChange={handleChange} />
        <button type="submit">Registrar</button>
      </div>
    </form>
  );
}

export default Proveedores;
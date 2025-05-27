import React, { useState } from "react";

function Categorias() {
  const [categoria, setCategoria] = useState({
    id: "",
    nombre: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Categoría registrada: " + JSON.stringify(categoria));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Registrar Categoría</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="id" placeholder="ID" value={categoria.id} onChange={handleChange} required />
        <input name="nombre" placeholder="Nombre" value={categoria.nombre} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={categoria.descripcion} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </div>
    </form>
  );
}

export default Categorias;
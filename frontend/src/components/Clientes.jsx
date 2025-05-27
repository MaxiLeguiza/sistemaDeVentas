import React, { useState } from "react";

function Clientes() {
  const [cliente, setCliente] = useState({
    rut: "",
    nombre: "",
    direccion: {
      calle: "",
      numero: "",
      comuna: "",
      ciudad: "",
    },
    telefonos: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["calle", "numero", "comuna", "ciudad"].includes(name)) {
      setCliente({
        ...cliente,
        direccion: { ...cliente.direccion, [name]: value },
      });
    } else {
      setCliente({ ...cliente, [name]: value });
    }
  };

  const handleTelefonoChange = (idx, value) => {
    const nuevosTelefonos = [...cliente.telefonos];
    nuevosTelefonos[idx] = value;
    setCliente({ ...cliente, telefonos: nuevosTelefonos });
  };

  const agregarTelefono = () => {
    setCliente({ ...cliente, telefonos: [...cliente.telefonos, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cliente registrado: " + JSON.stringify(cliente));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Registrar Cliente</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="rut" placeholder="RUT" value={cliente.rut} onChange={handleChange} required />
        <input name="nombre" placeholder="Nombre" value={cliente.nombre} onChange={handleChange} required />
        <input name="calle" placeholder="Calle" value={cliente.direccion.calle} onChange={handleChange} required />
        <input name="numero" placeholder="Número" value={cliente.direccion.numero} onChange={handleChange} required />
        <input name="comuna" placeholder="Comuna" value={cliente.direccion.comuna} onChange={handleChange} required />
        <input name="ciudad" placeholder="Ciudad" value={cliente.direccion.ciudad} onChange={handleChange} required />
        <div>
          <label>Teléfonos:</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cliente.telefonos.map((tel, idx) => (
              <input
                key={idx}
                placeholder={`Teléfono ${idx + 1}`}
                value={tel}
                onChange={(e) => handleTelefonoChange(idx, e.target.value)}
                required
              />
            ))}
          </div>
          <button type="button" onClick={agregarTelefono} style={{ marginTop: 8 }}>Agregar Teléfono</button>
        </div>
        <button type="submit">Registrar</button>
      </div>
    </form>
  );
}

export default Clientes;
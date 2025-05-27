import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

function Clientes() {
  const [cliente, setCliente] = useState({
    rut: "",
    nombre: "",
    calle: "",
    numero: "",
    comuna: "",
    ciudad: "",
    telefonos: [""],
  });
  const [clientes, setClientes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRut, setEditingRut] = useState(null);

  // Cargar clientes al montar el componente
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch(`${API_URL}/clientes`);
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["calle", "numero", "comuna", "ciudad"].includes(name)) {
      setCliente({
        ...cliente,
        [name]: value,
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

  const quitarTelefono = (idx) => {
    if (cliente.telefonos.length > 1) {
      const nuevosTelefonos = cliente.telefonos.filter((_, i) => i !== idx);
      setCliente({ ...cliente, telefonos: nuevosTelefonos });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clienteData = {
        ...cliente,
        numero: parseInt(cliente.numero),
        telefonos: cliente.telefonos.filter(tel => tel.trim() !== "").map(tel => ({ numero: tel }))
      };

      const method = isEditing ? "PUT" : "POST";
      const url = isEditing 
        ? `${API_URL}/clientes/${editingRut}` 
        : `${API_URL}/clientes`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteData),
      });

      if (response.ok) {
        alert(isEditing ? "Cliente actualizado" : "Cliente registrado");
        resetForm();
        fetchClientes();
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar la operación");
    }
  };

  const handleEdit = (cli) => {
    setCliente({
      rut: cli.rut,
      nombre: cli.nombre,
      calle: cli.calle,
      numero: cli.numero.toString(),
      comuna: cli.comuna || "",
      ciudad: cli.ciudad,
      telefonos: cli.telefonos?.length > 0 ? cli.telefonos.map(t => t.numero) : [""],
    });
    setIsEditing(true);
    setEditingRut(cli.rut);
  };

  const handleDelete = async (rut) => {
    if (confirm("¿Está seguro de eliminar este cliente?")) {
      try {
        const response = await fetch(`${API_URL}/clientes/${rut}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Cliente eliminado");
          fetchClientes();
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar el cliente");
      }
    }
  };

  const resetForm = () => {
    setCliente({
      rut: "",
      nombre: "",
      calle: "",
      numero: "",
      comuna: "",
      ciudad: "",
      telefonos: [""],
    });
    setIsEditing(false);
    setEditingRut(null);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30, padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
        <h2>{isEditing ? "Editar Cliente" : "Registrar Cliente"}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input 
            name="rut" 
            placeholder="RUT" 
            value={cliente.rut} 
            onChange={handleChange} 
            required 
            disabled={isEditing}
          />
          <input 
            name="nombre" 
            placeholder="Nombre" 
            value={cliente.nombre} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="calle" 
            placeholder="Calle" 
            value={cliente.calle} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="numero" 
            placeholder="Número" 
            type="number"
            value={cliente.numero} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="comuna" 
            placeholder="Comuna" 
            value={cliente.comuna} 
            onChange={handleChange} 
          />
          <input 
            name="ciudad" 
            placeholder="Ciudad" 
            value={cliente.ciudad} 
            onChange={handleChange} 
            required 
          />
          <div>
            <label>Teléfonos:</label>
            {cliente.telefonos.map((telefono, idx) => (
              <div key={idx} style={{ display: "flex", gap: 10 }}>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => handleTelefonoChange(idx, e.target.value)}
                  placeholder={`Teléfono ${idx + 1}`}
                  required
                />
                <button type="button" onClick={() => quitarTelefono(idx)}>
                  Eliminar
                </button>
              </div>
            ))}
            <button type="button" onClick={agregarTelefono}>
              Agregar Teléfono
            </button>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit">
              {isEditing ? "Actualizar" : "Registrar"}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} style={{ background: "#666", color: "#fff" }}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
      <div>
        <h3>Lista de Clientes</h3>
        {clientes.length === 0 ? (
          <p>No hay clientes registrados</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5", color: "black" }}>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>RUT</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Nombre</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Calle</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Número</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Comuna</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Ciudad</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Teléfonos</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cli) => (
                <tr key={cli.rut}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{cli.rut}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{cli.nombre}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{cli.calle}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{cli.numero}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{cli.comuna || "N/A"}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{cli.ciudad}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {cli.telefonos?.length > 0 ? cli.telefonos.map(t => t.numero).join(", ") : "N/A"}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <button onClick={() => handleEdit(cli)}>Editar</button>
                    <button onClick={() => handleDelete(cli.rut)} style={{ marginLeft: 10 }}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default Clientes;   
            
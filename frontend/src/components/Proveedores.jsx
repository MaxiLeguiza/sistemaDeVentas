import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

function Proveedores() {
  const [proveedor, setProveedor] = useState({
    rut: "",
    nombre: "",
    direccion: "",
    telefono: "",
    paginaWeb: "",
  });
  const [proveedores, setProveedores] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRut, setEditingRut] = useState(null);

  // Cargar proveedores al montar el componente
  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await fetch(`${API_URL}/proveedores`);
      const data = await response.json();
      setProveedores(data);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  const handleChange = (e) => {
    setProveedor({ ...proveedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing 
        ? `${API_URL}/proveedores/${editingRut}` 
        : `${API_URL}/proveedores`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proveedor),
      });

      if (response.ok) {
        alert(isEditing ? "Proveedor actualizado" : "Proveedor registrado");
        resetForm();
        fetchProveedores();
      } else {
        throw new Error("Error en la operación");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar la operación");
    }
  };

  const handleEdit = (prov) => {
    setProveedor({
      rut: prov.rut,
      nombre: prov.nombre,
      direccion: prov.direccion,
      telefono: prov.telefono.toString(),
      paginaWeb: prov.paginaWeb || "",
    });
    setIsEditing(true);
    setEditingRut(prov.rut);
  };

  const handleDelete = async (rut) => {
    if (confirm("¿Está seguro de eliminar este proveedor?")) {
      try {
        const response = await fetch(`${API_URL}/proveedores/${rut}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Proveedor eliminado");
          fetchProveedores();
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar el proveedor");
      }
    }
  };

  const resetForm = () => {
    setProveedor({
      rut: "",
      nombre: "",
      direccion: "",
      telefono: "",
      paginaWeb: "",
    });
    setIsEditing(false);
    setEditingRut(null);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30, padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
        <h2>{isEditing ? "Editar Proveedor" : "Registrar Proveedor"}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input 
            name="rut" 
            placeholder="RUT" 
            value={proveedor.rut} 
            onChange={handleChange} 
            required 
            disabled={isEditing}
          />
          <input 
            name="nombre" 
            placeholder="Nombre" 
            value={proveedor.nombre} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="direccion" 
            placeholder="Dirección" 
            value={proveedor.direccion} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="telefono" 
            placeholder="Teléfono" 
            type="number"
            value={proveedor.telefono} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="paginaWeb" 
            placeholder="Página Web (opcional)" 
            value={proveedor.paginaWeb} 
            onChange={handleChange} 
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit">
              {isEditing ? "Actualizar" : "Registrar"}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} style={{ background: "#666" }}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      <div>
        <h3>Lista de Proveedores</h3>
        {proveedores.length === 0 ? (
          <p>No hay proveedores registrados</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5", color: "black" }}>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>RUT</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Nombre</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Dirección</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Teléfono</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Web</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((prov) => (
                <tr key={prov.rut}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prov.rut}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prov.nombre}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prov.direccion}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prov.telefono}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{prov.paginaWeb || "N/A"}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <button 
                      onClick={() => handleEdit(prov)}
                      style={{ marginRight: 5, background: "#4CAF50", color: "white", border: "none", padding: "5px 10px", borderRadius: 3, cursor: "pointer" }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(prov.rut)}
                      style={{ background: "#f44336", color: "white", border: "none", padding: "5px 10px", borderRadius: 3, cursor: "pointer" }}
                    >
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

export default Proveedores;
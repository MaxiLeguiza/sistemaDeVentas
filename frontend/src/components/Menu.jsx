import React, { useState } from "react";
import Proveedores from "./Proveedores";
import Clientes from "./Clientes";
import Categorias from "./Categorias";
import Productos from "./Productos";
import Ventas from "./Ventas";

const opciones = [
  { key: "proveedores", label: "Proveedores", component: <Proveedores /> },
  { key: "clientes", label: "Clientes", component: <Clientes /> },
  { key: "categorias", label: "Categorías", component: <Categorias /> },
  { key: "productos", label: "Productos", component: <Productos /> },
  { key: "ventas", label: "Ventas", component: <Ventas /> },
];

function Menu() {
  const [seleccion, setSeleccion] = useState("proveedores");

  return (
    <div style={{ display: "flex", minHeight: "60vh" }}>
      {/* Contenido/Formulario a la izquierda */}
      <div style={{ flex: 1, padding: "24px 24px 24px 0" }}>
        {opciones.find((op) => op.key === seleccion)?.component}
      </div>
      {/* Menú a la derecha */}
      <div style={{ width: 180, borderLeft: "1px solid #ddd", padding: 24, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        {opciones.map((op) => (
          <button
            key={op.key}
            onClick={() => setSeleccion(op.key)}
            style={{
              marginBottom: 12,
              background: seleccion === op.key ? "#1976d2" : "#eee",
              color: seleccion === op.key ? "#fff" : "#000",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
              textAlign: "center"
            }}
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu;
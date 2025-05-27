import React, { useState } from "react";

function Ventas() {
  const [venta, setVenta] = useState({
    id: "",
    fecha: "",
    cliente: "",
    descuento: "",
    montoFinal: "",
    productos: [
      {
        producto: "",
        precioVenta: "",
        cantidad: "",
        subtotal: "",
      },
    ],
  });

  const handleChange = (e) => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  const handleProductoChange = (idx, e) => {
    const { name, value } = e.target;
    const nuevosProductos = [...venta.productos];
    nuevosProductos[idx][name] = value;
    setVenta({ ...venta, productos: nuevosProductos });
  };

  const agregarProducto = () => {
    setVenta({
      ...venta,
      productos: [
        ...venta.productos,
        { producto: "", precioVenta: "", cantidad: "", subtotal: "" },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Venta registrada: " + JSON.stringify(venta));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Registrar Venta</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="id" placeholder="ID" value={venta.id} onChange={handleChange} required />
        <input name="fecha" type="date" value={venta.fecha} onChange={handleChange} required />
        <input name="cliente" placeholder="Cliente" value={venta.cliente} onChange={handleChange} required />
        <input name="descuento" placeholder="Descuento aplicado (%)" type="number" value={venta.descuento} onChange={handleChange} />
        <input name="montoFinal" placeholder="Monto Final" type="number" value={venta.montoFinal} onChange={handleChange} required />
        <div>
          <label>Productos vendidos:</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {venta.productos.map((prod, idx) => (
              <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input
                  name="producto"
                  placeholder="Producto"
                  value={prod.producto}
                  onChange={(e) => handleProductoChange(idx, e)}
                  required
                  style={{ flex: 2 }}
                />
                <input
                  name="precioVenta"
                  placeholder="Precio al momento de la venta"
                  type="number"
                  value={prod.precioVenta}
                  onChange={(e) => handleProductoChange(idx, e)}
                  required
                  style={{ flex: 1 }}
                />
                <input
                  name="cantidad"
                  placeholder="Cantidad"
                  type="number"
                  value={prod.cantidad}
                  onChange={(e) => handleProductoChange(idx, e)}
                  required
                  style={{ flex: 1 }}
                />
                <input
                  name="subtotal"
                  placeholder="Subtotal"
                  type="number"
                  value={prod.subtotal}
                  onChange={(e) => handleProductoChange(idx, e)}
                  required
                  style={{ flex: 1 }}
                />
              </div>
            ))}
          </div>
          <button type="button" onClick={agregarProducto} style={{ marginTop: 8 }}>Agregar Producto</button>
        </div>
        <button type="submit">Registrar Venta</button>
      </div>
    </form>
  );
}

export default Ventas;
import React, { useState, useEffect } from "react";

function Ventas() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [venta, setVenta] = useState({
    fecha: "",
    cliente: "",
    descuento: "",
    productos: [
      {
        producto: "",
        precioVenta: "",
        cantidad: "",
        subtotal: "",
      },
    ],
  });

  const url = "http://localhost:3000"; // Cambia esto por la URL de tu backend

  // Simulación de fetch de clientes y productos (reemplaza por tu fetch real)
  useEffect(() => {
    // fetch("URL_DE_TU_BACKEND/clientes")
    //   .then(res => res.json())
    //   .then(data => setClientes(data));
    setClientes([
      { rut: "12345678-9", nombre: "Juan Pérez" },
      { rut: "98765432-1", nombre: "Ana Gómez" },
      { rut: "11223344-5", nombre: "Carlos Ruiz" },
    ]);

    fetch( `${url}/productos`)
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const calcularTotal = () =>
    venta.productos.reduce(
      (acc, prod) => acc + (parseFloat(prod.subtotal) || 0),
      0
    );

  const calcularMontoFinal = () => {
    const total = calcularTotal();
    const descuento = parseFloat(venta.descuento) || 0;
    const montoFinal = total - (total * descuento) / 100;
    return montoFinal.toFixed(2);
  };

  const handleChange = (e) => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  // Cuando seleccionas un producto, puedes autocompletar el precio
  const handleProductoChange = (idx, e) => {
    const { name, value } = e.target;
    const nuevosProductos = [...venta.productos];

    if (name === "producto") {
      nuevosProductos[idx][name] = value;
      // Busca el producto seleccionado para autocompletar el precio
      const prodSeleccionado = productos.find((p) => p.id === value);
      if (prodSeleccionado) {
        nuevosProductos[idx].precioVenta = prodSeleccionado.precio;
        // Recalcula el subtotal si ya hay cantidad
        const cantidad = parseFloat(nuevosProductos[idx].cantidad) || 0;
        nuevosProductos[idx].subtotal = (prodSeleccionado.precio * cantidad).toFixed(2);
      }
    } else {
      nuevosProductos[idx][name] = value;
      if (name === "precioVenta" || name === "cantidad") {
        const precio = parseFloat(nuevosProductos[idx].precioVenta) || 0;
        const cantidad = parseFloat(nuevosProductos[idx].cantidad) || 0;
        nuevosProductos[idx].subtotal = (precio * cantidad).toFixed(2);
      }
    }

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

  const quitarProducto = (idx) => {
    setVenta({
      ...venta,
      productos: venta.productos.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ventaConMontos = {
      ...venta,
      total: calcularTotal().toFixed(2),
      montoFinal: calcularMontoFinal(),
    };
    alert("Venta registrada: " + JSON.stringify(ventaConMontos, null, 2));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Registrar Venta</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="fecha" type="date" value={venta.fecha} onChange={handleChange} required />
        <select
          name="cliente"
          value={venta.cliente}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un cliente</option>
          {clientes.map((cli) => (
            <option key={cli.rut} value={cli.rut}>
              {cli.nombre} ({cli.rut})
            </option>
          ))}
        </select>
        <input
          name="descuento"
          placeholder="Descuento aplicado (%)"
          type="number"
          min="0"
          max="100"
          value={venta.descuento}
          onChange={handleChange}
        />
        <div>
          <label>Productos vendidos:</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {venta.productos.map((prod, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                  marginBottom: 1,
                  padding: 2,
                  borderRadius: 4,
                  alignItems: "center",
                  border: "1px solid #eee",
                }}
              >
                <select
                  name="producto"
                  value={prod.producto}
                  onChange={(e) => handleProductoChange(idx, e)}
                  required
                  style={{ flex: 2 }}
                >
                  <option value="">Selecciona producto</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} ({p.id})
                    </option>
                  ))}
                </select>
                <input
                  name="precioVenta"
                  placeholder="Precio"
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
                  readOnly
                  style={{ flex: 1, background: "#f0f0f0" }}
                />
                <button
                  type="button"
                  onClick={() => quitarProducto(idx)}
                  style={{
                    background: "#e53935",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 12px",
                    cursor: "pointer",
                  }}
                  disabled={venta.productos.length === 1}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={agregarProducto} style={{ marginTop: 8 }}>
            Agregar Producto
          </button>
        </div>
        <input
          name="total"
          placeholder="Monto Total"
          type="number"
          value={calcularTotal().toFixed(2)}
          readOnly
          style={{ background: "#e0e0e0", fontWeight: "bold" }}
        />
        <input
          name="montoFinal"
          placeholder="Monto Final (con descuento)"
          type="number"
          value={calcularMontoFinal()}
          readOnly
          style={{ background: "#d0ffd0", fontWeight: "bold" }}
        />
        <button type="submit">Registrar Venta</button>
      </div>
    </form>
  );
}

export default Ventas;
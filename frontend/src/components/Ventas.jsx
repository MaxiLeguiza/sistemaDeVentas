import React, { useState, useEffect } from "react";

function Ventas() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]); // <-- Nuevo estado para las ventas
  const [venta, setVenta] = useState({
    fecha: "",
    clienteRut: "",
    descuento: "",
    detalleVenta: [
      {
        productoId: "",
        precioVenta: "",
        cantidad: "",
        subtotal: "",
      },
    ],
  });

  const url = "http://localhost:3000";

  useEffect(() => {
    fetch(`${url}/clientes`)
      .then(res => res.json())
      .then(data => setClientes(data));

    fetch(`${url}/productos`)
      .then(res => res.json())
      .then(data => setProductos(data));

    fetchVentas(); // Cargar ventas al montar
  }, []);

  const fetchVentas = async () => {
    try {
      const res = await fetch(`${url}/ventas`);
      const data = await res.json();
      setVentas(data);
    } catch (error) {
      setVentas([]);
    }
  };

  const calcularTotal = () =>
    venta.detalleVenta.reduce(
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

  const handleDetalleChange = (idx, e) => {
    const { name, value } = e.target;
    const nuevosDetalle = [...venta.detalleVenta];

    if (name === "productoId") {
      nuevosDetalle[idx][name] = value;
      const prodSeleccionado = productos.find((p) => p.id === Number(value));
      if (prodSeleccionado) {
        nuevosDetalle[idx].precioVenta = prodSeleccionado.precioActual;
        const cantidad = parseFloat(nuevosDetalle[idx].cantidad) || 0;
        nuevosDetalle[idx].subtotal = (prodSeleccionado.precioActual * cantidad).toFixed(2);
      }
    } else {
      nuevosDetalle[idx][name] = value;
      if (name === "precioVenta" || name === "cantidad") {
        const precio = parseFloat(nuevosDetalle[idx].precioVenta) || 0;
        const cantidad = parseFloat(nuevosDetalle[idx].cantidad) || 0;
        nuevosDetalle[idx].subtotal = (precio * cantidad).toFixed(2);
      }
    }

    setVenta({ ...venta, detalleVenta: nuevosDetalle });
  };

  const agregarProducto = () => {
    setVenta({
      ...venta,
      detalleVenta: [
        ...venta.detalleVenta,
        { productoId: "", precioVenta: "", cantidad: "", subtotal: "" },
      ],
    });
  };

  const quitarProducto = (idx) => {
    setVenta({
      ...venta,
      detalleVenta: venta.detalleVenta.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ventaData = {
        clienteRut: venta.clienteRut,
        fecha: venta.fecha ? new Date(venta.fecha) : undefined,
        descuento: parseFloat(venta.descuento) || 0,
        total: calcularTotal(),
        detalleVenta: venta.detalleVenta
          .filter(
            (d) =>
              d.productoId &&
              d.precioVenta &&
              d.cantidad &&
              d.subtotal
          )
          .map((d) => ({
            productoId: Number(d.productoId),
            precioVenta: parseFloat(d.precioVenta),
            cantidad: parseInt(d.cantidad),
            subtotal: parseFloat(d.subtotal),
          })),
      };

      const response = await fetch(`${url}/ventas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaData),
      });

      if (response.ok) {
        alert("Venta registrada correctamente");
        setVenta({
          fecha: "",
          clienteRut: "",
          descuento: "",
          detalleVenta: [
            {
              productoId: "",
              precioVenta: "",
              cantidad: "",
              subtotal: "",
            },
          ],
        });
        fetchVentas(); // Actualiza la tabla de ventas
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      alert("Error al registrar la venta: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2>Registrar Venta</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            name="fecha"
            type="date"
            value={venta.fecha}
            onChange={handleChange}
            required
          />
          <select
            name="clienteRut"
            value={venta.clienteRut}
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
              {venta.detalleVenta.map((prod, idx) => (
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
                  }}
                >
                  <select
                    name="productoId"
                    value={prod.productoId}
                    onChange={(e) => handleDetalleChange(idx, e)}
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
                    onChange={(e) => handleDetalleChange(idx, e)}
                    required
                    style={{ flex: 1 }}
                  />
                  <input
                    name="cantidad"
                    placeholder="Cantidad"
                    type="number"
                    value={prod.cantidad}
                    onChange={(e) => handleDetalleChange(idx, e)}
                    required
                    style={{ flex: 1 }}
                  />
                  <input
                    name="subtotal"
                    placeholder="Subtotal"
                    type="number"
                    value={prod.subtotal}
                    readOnly
                    style={{ flex: 1, background: "gray" }}
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
                    disabled={venta.detalleVenta.length === 1}
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
          <h3>Total de la venta</h3>
          <input
            name="total"
            placeholder="Monto Total"
            type="number"
            value={calcularTotal().toFixed(2)}
            readOnly
            style={{ background: "black", fontWeight: "bold", color: "white" }}
          />
          <h3>Monto Final (con descuento)</h3>
          <input
            name="montoFinal"
            placeholder="Monto Final (con descuento)"
            type="number"
            value={calcularMontoFinal()}
            readOnly
            style={{ background: "black", fontWeight: "bold", color: "white" }}
          />
          <button type="submit">Registrar Venta</button>
        </div>
      </form>

      {/* Tabla de ventas */}
      <div style={{ maxWidth: 900, margin: "40px auto 0" }}>
        <h2>Ventas Registradas</h2>
        {ventas.length === 0 ? (
          <p>No hay ventas registradas.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5", color: "black" }}>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>ID</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Fecha</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Cliente</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Descuento (%)</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Total</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v.id}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{v.id}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {v.fecha ? new Date(v.fecha).toLocaleDateString() : ""}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {v.cliente?.nombre || v.clienteRut}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{v.descuento}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{v.total}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {v.detalleVenta?.map((d, i) => (
                        <li key={i}>
                          {(() => {
                            const prod = productos.find(p => p.id === d.productoId);
                            return `${prod ? prod.nombre : "Producto"} x${d.cantidad} ($${d.precioVenta})`;
                          })()}
                        </li>
                      ))}
                    </ul>
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

export default Ventas;
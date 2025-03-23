import React, { useState } from "react";
import preciosReferencia from './preciosReferencia.json';

const CalculadoraAhorro = () => {
  // Precios editables para el cliente
  const [preciosCliente, setPreciosCliente] = useState({
    P1: "", P2: "", P3: "", P4: "", P5: "", P6: ""
  });

  // Consumos ingresados por el cliente
  const [consumos, setConsumos] = useState({
    P1: "", P2: "", P3: "", P4: "", P5: "", P6: ""
  });

  // Resultado del cálculo de ahorro
  const [ahorro, setAhorro] = useState(null);

  // Manejar cambios en los precios del cliente
  const handlePrecioClienteChange = (e, periodo) => {
    setPreciosCliente({ ...preciosCliente, [periodo]: e.target.value });
  };

  // Manejar cambios en los consumos
  const handleConsumoChange = (e, periodo) => {
    setConsumos({ ...consumos, [periodo]: e.target.value });
  };

  // Calcular el ahorro
  const calcularAhorro = () => {
    let ahorroTotal = 0;

    Object.keys(preciosReferencia).forEach((periodo) => {
      const precioRef = parseFloat(preciosReferencia[periodo]);
      const precioCliente = parseFloat(preciosCliente[periodo]) || 0;
      const consumo = parseFloat(consumos[periodo]) || 0;

      const costoRef = precioRef * consumo;
      const costoCliente = precioCliente * consumo;
      ahorroTotal += costoCliente - costoRef;
    });

    setAhorro(ahorroTotal.toFixed(2));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Calculadora de Ahorro Energético</h1>
      <table style={{ margin: "auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Precio Referencia (€ / kWh)</th>
            <th>Precio Cliente (€ / kWh)</th>
            <th>Consumo (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(preciosReferencia).map((periodo) => (
            <tr key={periodo}>
              <td>{periodo}</td>
              <td>
                <input
                  type="text"
                  readOnly
                  value={parseFloat(preciosReferencia[periodo]).toFixed(6)}
                  style={{
                    backgroundColor: "#eee",
                    border: "1px solid #ccc",
                    textAlign: "center",
                    width: "100px"
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={preciosCliente[periodo]}
                  onChange={(e) => handlePrecioClienteChange(e, periodo)}
                  step="0.0001"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={consumos[periodo]}
                  onChange={(e) => handleConsumoChange(e, periodo)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={calcularAhorro}
        style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}
      >
        Calcular Ahorro
      </button>

      {ahorro !== null && (
        <h2>Ahorro estimado: €{ahorro} al mes</h2>
      )}
    </div>
  );
};

export default CalculadoraAhorro;

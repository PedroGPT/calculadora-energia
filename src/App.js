import React, { useState } from 'react';
import preciosReferencia from './preciosReferencia.json';
import './App.css';

function App() {
  const [preciosCliente, setPreciosCliente] = useState(Array(6).fill(''));
  const [consumos, setConsumos] = useState(Array(6).fill(''));
  const [ahorro, setAhorro] = useState(null);
  const [costeOriginal, setCosteOriginal] = useState(null);
  const [porcentajeAhorro, setPorcentajeAhorro] = useState(null);

  const handlePrecioChange = (index, value) => {
    const nuevosPrecios = [...preciosCliente];
    nuevosPrecios[index] = value;
    setPreciosCliente(nuevosPrecios);
  };

  const handleConsumoChange = (index, value) => {
    const nuevosConsumos = [...consumos];
    nuevosConsumos[index] = value;
    setConsumos(nuevosConsumos);
  };

  const calcularAhorro = () => {
    let ahorroTotal = 0;
    let costeTotalOriginal = 0;

    for (let i = 0; i < 6; i++) {
      const precioRef = parseFloat(preciosReferencia[`P${i + 1}`]);
      const precioCli = parseFloat(preciosCliente[i]);
      const consumo = parseFloat(consumos[i]);

      if (!isNaN(precioRef) && !isNaN(precioCli) && !isNaN(consumo)) {
        const costeOriginal = precioCli * consumo;
        const costeNuevo = precioRef * consumo;
        ahorroTotal += costeOriginal - costeNuevo;
        costeTotalOriginal += costeOriginal;
      }
    }

    const porcentaje = costeTotalOriginal !== 0 ? (ahorroTotal / costeTotalOriginal) * 100 : 0;

    setAhorro(ahorroTotal);
    setCosteOriginal(costeTotalOriginal);
    setPorcentajeAhorro(porcentaje);
  };

  return (
    <div className="App">
      <h1>Calculadora de Ahorro Energético</h1>
      <table>
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Precio Referencia (€ / kWh)</th>
            <th>Precio Cliente (€ / kWh)</th>
            <th>Consumo (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i}>
              <td>{`P${i + 1}`}</td>
              <td>
                <input
                  type="text"
                  value={preciosReferencia[`P${i + 1}`]}
                  readOnly
                />
              </td>
              <td>
                <input
                  type="number"
                  value={preciosCliente[i]}
                  onChange={(e) => handlePrecioChange(i, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={consumos[i]}
                  onChange={(e) => handleConsumoChange(i, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={calcularAhorro}>Calcular Ahorro</button>

      {ahorro !== null && (
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Ahorro total: {ahorro.toFixed(2)} €
          <br />
          Coste total original del cliente: {costeOriginal.toFixed(2)} €
          <br />
          Porcentaje de ahorro: {porcentajeAhorro.toFixed(2)}%
        </div>
      )}
    </div>
  );
}

export default App;

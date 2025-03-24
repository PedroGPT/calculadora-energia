import React, { useState } from 'react';
import preciosReferencia from './preciosReferencia.json';
import './App.css';

function App() {
  const [preciosCliente, setPreciosCliente] = useState(Array(6).fill(''));
  const [consumos, setConsumos] = useState(Array(6).fill(''));
  const [resultados, setResultados] = useState(null);

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
    let costeActual = 0;
    let costeFuturo = 0;

    for (let i = 0; i < 6; i++) {
      const precioCliente = parseFloat(preciosCliente[i]) || 0;
      const precioReferencia = parseFloat(preciosReferencia[`P${i + 1}`]) || 0;
      const consumo = parseFloat(consumos[i]) || 0;

      costeActual += precioCliente * consumo;
      costeFuturo += precioReferencia * consumo;
    }

    const ahorro = costeActual - costeFuturo;
    const porcentajeAhorro = costeActual > 0 ? (ahorro / costeActual) * 100 : 0;

    setResultados({
      costeActual: costeActual.toFixed(2),
      costeFuturo: costeFuturo.toFixed(2),
      ahorro: ahorro.toFixed(2),
      porcentajeAhorro: porcentajeAhorro.toFixed(2)
    });
  };

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Calculadora de Ahorro Energético</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Precio Referencia<br/> (€ / kWh)</th>
            <th>Precio Cliente<br/> (€ / kWh)</th>
            <th>Consumo<br/> (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, i) => (
            <tr key={i}>
              <td style={{ textAlign: 'center' }}>P{i + 1}</td>
              <td><input type="number" value={preciosReferencia[`P${i + 1}`]} readOnly style={{ width: '100%' }} /></td>
              <td><input type="number" value={preciosCliente[i]} onChange={(e) => handlePrecioChange(i, e.target.value)} style={{ width: '100%' }} /></td>
              <td><input type="number" value={consumos[i]} onChange={(e) => handleConsumoChange(i, e.target.value)} style={{ width: '100%' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={calcularAhorro} style={{ padding: '0.6rem 1.2rem', fontSize: '1rem', cursor: 'pointer' }}>
        Calcular Ahorro
      </button>

      {resultados && (
        <div style={{ marginTop: '2rem', textAlign: 'left', fontSize: '1.1rem' }}>
          <p><strong>Coste actual energía cliente:</strong> {resultados.costeActual} €</p>
          <p><strong>Coste futuro energía cliente:</strong> {resultados.costeFuturo} €</p>
          <p><strong>Ahorro total:</strong> {resultados.ahorro} €</p>
          <p><strong>Porcentaje de ahorro:</strong> {resultados.porcentajeAhorro} %</p>
        </div>
      )}
    </div>
  );
}

export default App;

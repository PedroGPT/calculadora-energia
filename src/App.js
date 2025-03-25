import React, { useState, useEffect } from 'react';
import './App.css';
import preciosReferencia from './preciosReferencia.json';
import { generarPDF } from './generarPDF';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [precios, setPrecios] = useState([]);
  const [clientePrecios, setClientePrecios] = useState(Array(6).fill(''));
  const [consumos, setConsumos] = useState(Array(6).fill(''));
  const [resultados, setResultados] = useState(null);
  const [mostrarGuardar, setMostrarGuardar] = useState(false);

  useEffect(() => {
    const preciosArray = [
      preciosReferencia.P1,
      preciosReferencia.P2,
      preciosReferencia.P3,
      preciosReferencia.P4,
      preciosReferencia.P5,
      preciosReferencia.P6,
    ];
    setPrecios(preciosArray);
  }, []);

  const handlePrecioChange = (index, value) => {
    const nuevosPrecios = [...clientePrecios];
    nuevosPrecios[index] = value;
    setClientePrecios(nuevosPrecios);
  };

  const handleConsumoChange = (index, value) => {
    const nuevosConsumos = [...consumos];
    nuevosConsumos[index] = value;
    setConsumos(nuevosConsumos);
  };

  const calcularAhorro = () => {
    let consumoTotal = 0;
    let importeTotal = 0;
    let importeFuturo = 0;

    for (let i = 0; i < 6; i++) {
      const consumo = parseFloat(consumos[i].replace(',', '.')) || 0;
      const precioCliente = parseFloat(clientePrecios[i].replace(',', '.')) || 0;
      const precioFuturo = parseFloat(precios[i]) || 0;

      consumoTotal += consumo;
      importeTotal += consumo * precioCliente;
      importeFuturo += consumo * precioFuturo;
    }

    const ahorro = importeTotal - importeFuturo;
    const porcentaje = importeTotal > 0 ? (ahorro / importeTotal) * 100 : 0;

    setResultados({
      consumoTotal: consumoTotal.toFixed(2),
      importeTotal: importeTotal.toFixed(2),
      importeFuturo: importeFuturo.toFixed(2),
      ahorro: ahorro.toFixed(2),
      porcentaje: porcentaje.toFixed(2),
    });

    setMostrarGuardar(true);
  };

  const guardarYCerrar = () => {
    alert('Datos guardados correctamente.');
    setMostrarFormulario(false);
    setMostrarGuardar(false);
  };

  const datosParaPDF = precios.map((precio, i) => ({
    precioFuturo: parseFloat(precio).toFixed(6),
    precioCliente: clientePrecios[i],
    consumo: consumos[i]
  }));

  return (
    <div className="app">
      <header className="header">
        <img src="/logo.png" alt="Logo ECE Consultores" className="logo" />
      </header>

      {!mostrarFormulario && (
        <>
          <h1 className="titulo">Calculadora de Ahorro Energético</h1>
          <button className="boton-principal" onClick={() => setMostrarFormulario(true)}>
            Añadir Precios y Consumos
          </button>
        </>
      )}

      {mostrarFormulario && (
        <div className="formulario">
          <table className="tabla">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Precios a Futuro (kWh)</th>
                <th>Precio Factura (kWh)</th>
                <th>Consumo (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {precios.map((precio, index) => (
                <tr key={index}>
                  <td className="celda-fija">Periodo {index + 1}</td>
                  <td className="celda-fija">{parseFloat(precio).toFixed(6)}</td>
                  <td>
                    <input
                      type="text"
                      value={clientePrecios[index]}
                      onChange={(e) => handlePrecioChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={consumos[index]}
                      onChange={(e) => handleConsumoChange(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="centrado">
            <button className="boton-calcular" onClick={calcularAhorro}>
              Calcular Ahorro
            </button>
          </div>

          {mostrarGuardar && (
            <div className="centrado">
              <button className="boton-guardar" onClick={guardarYCerrar}>
                Guardar
              </button>
            </div>
          )}

          {resultados && (
            <div className="resultados">
              <h2>Ahorro Estimado:</h2>
              <p><strong>Consumo Total (kWh):</strong> {resultados.consumoTotal}</p>
              <p><strong>Importe Total (€):</strong> {resultados.importeTotal}</p>
              <p><strong>Importe con Precios a Futuro (€):</strong> {resultados.importeFuturo}</p>
              <p style={{ color: resultados.ahorro >= 0 ? 'green' : 'red' }}>
                <strong>Total Ahorro (€):</strong> {resultados.ahorro}
              </p>
              <p style={{ color: resultados.porcentaje >= 0 ? 'green' : 'red' }}>
                <strong>Porcentaje de Ahorro (%):</strong> {resultados.porcentaje}
              </p>
              <div className="contenedor-derecha">
                <button className="boton-pdf" onClick={() => generarPDF(datosParaPDF, resultados)}>
                  Generar Informe
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

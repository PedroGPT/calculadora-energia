const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Ruta al archivo Excel dentro de la carpeta src
const excelPath = path.join(__dirname, 'src', 'PreciosP.xlsx');

// Leer el archivo Excel
const workbook = xlsx.readFile(excelPath);
const sheet = workbook.Sheets['3.0TD COMP'];

if (!sheet) {
  console.error('❌ Hoja "3.0TD COMP" no encontrada en el Excel.');
  process.exit(1);
}

// Filas esperadas para los precios P1 a P6
const filas = [2, 3, 4, 5, 6, 7]; // Excel usa 1-indexado

const precios = {};

filas.forEach((fila, index) => {
  const celda = `N${fila}`; // Columna N = precios
  const valorCelda = sheet[celda]?.v;

  if (valorCelda === undefined) {
    console.warn(`⚠️ Celda ${celda} vacía o no encontrada.`);
    return;
  }

  // Extraer número aunque tenga "€"
  const numero = parseFloat(
    valorCelda.toString().replace(',', '.').replace(/[^\d.-]/g, '')
  );

  precios[`P${index + 1}`] = numero.toFixed(6);
});

// Guardar JSON
const outputPath = path.join(__dirname, 'src', 'preciosReferencia.json');
fs.writeFileSync(outputPath, JSON.stringify(precios, null, 2));

console.log('✅ Precios de referencia actualizados correctamente:', precios);

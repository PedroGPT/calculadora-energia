const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..', 'PreciosP.xlsx');

try {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets['3.0TD COMP'];
  const preciosReferencia = [];

  for (let i = 2; i <= 7; i++) {
    const cell = sheet[`N${i}`];
    if (cell && !isNaN(cell.v)) {
      const valor = Number(parseFloat(cell.v).toFixed(6));
      preciosReferencia.push(valor);
    }
  }

  // Guardamos como archivo JSON para que React lo pueda usar
  fs.writeFileSync(
    path.join(__dirname, 'preciosReferencia.json'),
    JSON.stringify(preciosReferencia)
  );

  console.log("Precios de referencia:", preciosReferencia);
} catch (error) {
  console.error("Error al leer el archivo Excel:", error.message);
}


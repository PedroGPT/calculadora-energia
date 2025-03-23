
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const workbook = xlsx.readFile(path.join(__dirname, 'src', 'PreciosP.xlsx'));
const sheet = workbook.Sheets['3.0TD COMP'];
const precios = {};

for (let i = 1; i <= 6; i++) {
  const cell = sheet[`N${i + 1}`];
  if (cell) {
    precios[`P${i}`] = Number(cell.v).toFixed(6);
  }
}

fs.writeFileSync(
  path.join(__dirname, 'src', 'preciosReferencia.json'),
  JSON.stringify(precios, null, 2)
);

console.log('✅ Precios de referencia actualizados correctamente:', precios);

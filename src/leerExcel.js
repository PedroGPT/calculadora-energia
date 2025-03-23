const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('./PreciosP.xlsx');
const worksheet = workbook.Sheets['3.0TD COMP'];

const precios = {};
['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].forEach((p, i) => {
  const celda = worksheet[`N${i + 2}`]; // Empieza en N2
  if (celda && celda.v != null) {
    precios[p] = Number(celda.v).toFixed(6);
  }
});

fs.writeFileSync('./src/preciosReferencia.json', JSON.stringify(precios, null, 2));
console.log('✅ Precios de referencia actualizados:', precios);

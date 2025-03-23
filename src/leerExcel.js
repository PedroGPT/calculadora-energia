const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'PreciosP.xlsx');

try {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets['3.0TD COMP']; // Asegúrate que esta es la hoja correcta

  const preciosReferencia = {};
  for (let i = 2; i <= 7; i++) {
    const cell = sheet[`N${i}`];
    const periodo = `P${i - 1}`;

    if (cell && !isNaN(cell.v)) {
      const valor = Number(parseFloat(cell.v).toFixed(6)).toFixed(6); // fuerza 6 decimales
      preciosReferencia[periodo] = valor;
      console.log(`✅ ${periodo} => ${valor}`);
    } else {
      preciosReferencia[periodo] = '0.000000';
      console.warn(`⚠️ No se pudo leer la celda N${i}`);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'preciosReferencia.json'),
    JSON.stringify(preciosReferencia, null, 2)
  );

  console.log('\n✅ Precios de referencia leídos y guardados:');
  console.log(preciosReferencia);
} catch (error) {
  console.error('❌ Error al leer el archivo Excel:', error.message);
}

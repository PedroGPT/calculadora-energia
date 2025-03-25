const fs = require('fs');
const path = require('path');

// Usar __dirname para obtener la ruta del directorio actual
const filePath = path.join(__dirname, 'preciosReferencia.json'); // Sin 'src' adicional

// Leer el archivo JSON
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo preciosReferencia.json:', err);
    return;
  }

  // Parsear el contenido del archivo JSON
  const preciosReferencia = JSON.parse(data);

  // Comprobar si la estructura del archivo es correcta
  if (preciosReferencia && preciosReferencia.periods) {
    console.log('Precios de referencia cargados correctamente:', preciosReferencia.periods);
  } else {
    console.error('La estructura del archivo preciosReferencia.json no es correcta.');
  }
});

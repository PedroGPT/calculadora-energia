import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarPDF = async (datos, resultados) => {
  const doc = new jsPDF();

  // 1. Cargar logo desde public/logo.png como base64
  const getImageAsBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  let y = 20;

  try {
    const logoBase64 = await getImageAsBase64('/logo.png');
    doc.addImage(logoBase64, 'PNG', 80, y, 50, 20);
    y += 30;
  } catch (err) {
    console.warn("No se pudo cargar el logo:", err);
  }

  // 2. Título y fecha
  doc.setFontSize(16);
  doc.text('Propuesta de Ahorro Energético', 105, y, { align: 'center' });
  y += 10;
  doc.setFontSize(10);
  const fecha = new Date().toLocaleDateString();
  doc.text(`Fecha: ${fecha}`, 14, y);
  y += 10;

  // 3. Tabla
  autoTable(doc, {
    startY: y,
    head: [['Periodo', 'Precio a Futuro (kWh)', 'Precio Factura (kWh)', 'Consumo (kWh)']],
    body: datos.map((fila, i) => [
      `Periodo ${i + 1}`,
      fila.precioFuturo,
      fila.precioCliente,
      fila.consumo,
    ]),
    styles: { fontSize: 9 },
    margin: { left: 14, right: 14 },
  });

  // 4. Ahorro estimado
  let posY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text('Ahorro Estimado:', 14, posY);
  posY += 8;

  const lineHeight = 7;
  doc.setFontSize(10);
  doc.text(`Consumo Total (kWh): ${resultados.consumoTotal}`, 14, posY);
  posY += lineHeight;
  doc.text(`Importe Total (€): ${resultados.importeTotal}`, 14, posY);
  posY += lineHeight;
  doc.text(`Importe con Precios a Futuro (€): ${resultados.importeFuturo}`, 14, posY);
  posY += lineHeight;
  doc.setTextColor(resultados.ahorro > 0 ? 'green' : 'red');
  doc.text(`Total Ahorro (€): ${resultados.ahorro}`, 14, posY);
  posY += lineHeight;
  doc.text(`Porcentaje de Ahorro (%): ${resultados.porcentaje}`, 14, posY);
  doc.setTextColor(0, 0, 0);
  posY += lineHeight * 2;

  // 5. Texto persuasivo dinámico
  const textoPropuesta = `
¿TU EMPRESA SIGUE PAGANDO TARIFAS INNECESARIAMENTE ALTAS POR SU CONSUMO ENERGÉTICO?

Este análisis revela una oportunidad clara:

Por el mismo consumo de ${resultados.consumoTotal} kWh, hoy estás pagando ${resultados.importeTotal} €, 
cuando podrías estar pagando solo ${resultados.importeFuturo} €.

La diferencia: ${resultados.ahorro} € menos en tu factura. 
Eso representa un ahorro directo del ${resultados.porcentaje}%.


📉 ¿La clave?
Acceder a precios a futuro más bajos y estables, diseñados para 
optimizar los costes sin modificar el consumo ni la operativa 
de tu empresa.

✅ Resultados inmediatos:
- Ahorro mensual real y sostenible.
- Mayor previsibilidad en tus costes energéticos.
- Mejora de la eficiencia financiera sin inversión adicional.

Reducir tus costes energéticos no es una opción. Es una decisión estratégica.
`;

  const lineas = doc.splitTextToSize(textoPropuesta, 180);
  doc.setFontSize(9);
  doc.text(lineas, 14, posY, { lineHeightFactor: 1.5 });

  // 6. Guardar PDF
  doc.save('propuesta_ahorro.pdf');
};

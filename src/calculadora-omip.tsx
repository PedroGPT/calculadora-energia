import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const periodosOMIP = [
  ...Array.from({ length: 12 }, (_, i) => ({ label: `Mes ${i + 1} - 2025`, value: `2025-M${i + 1}` })),
  { label: 'Q2 2025', value: '2025-Q2' },
  { label: 'Q3 2025', value: '2025-Q3' },
  { label: 'Q4 2025', value: '2025-Q4' },
  { label: '2º Semestre 2025', value: '2025-S2' },
  { label: 'Año 2026', value: '2026' },
  { label: 'Año 2027', value: '2027' },
];

const preciosPorPeriodo = {
  P1: "0.125000",
  P2: "0.118000",
  P3: "0.110000",
  P4: "0.108000",
  P5: "0.106000",
  P6: "0.102000"
};

export default function CalculadoraOmip() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('2025-M1');
  const precioOMIP = "0.087 €/kWh"; // Simulado

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">🔋 NUEVA Calculadora Energética OMIP</h1>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block font-medium mb-2">Selecciona el periodo OMIP</label>
              <Select onValueChange={setPeriodoSeleccionado} defaultValue={periodoSeleccionado}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un periodo" />
                </SelectTrigger>
                <SelectContent>
                  {periodosOMIP.map((p) => (
                    <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block font-medium mb-2">Precio OMIP de referencia:</label>
              <div className="bg-white border rounded px-4 py-2 text-lg">{precioOMIP}</div>
            </div>

            <div>
              <label className="block font-medium mb-2">Precio final por periodo (€/kWh):</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(preciosPorPeriodo).map(([periodo, precio]) => (
                  <div key={periodo} className="bg-white rounded shadow p-4 text-center">
                    <div className="text-sm font-semibold">{periodo}</div>
                    <div className="text-xl font-mono">{precio}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button className="mt-4">Simular Ahorro</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

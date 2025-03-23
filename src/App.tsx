import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalculadoraOmip from "./CalculadoraOmip";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/calculadora-omip" element={<CalculadoraOmip />} />
      </Routes>
    </Router>
  );
}

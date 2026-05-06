import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Grazie from "./pages/Grazie";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/grazie" element={<Grazie />} />
      <Route path="*" element={<Index />} />
    </Routes>
  );
}

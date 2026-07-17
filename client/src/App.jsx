import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Experiment from "./pages/Experiment";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/register" element={<Register/>} />

      <Route path="/experiment/:experimentId" element={<Experiment />} />

      <Route path="/dashboard/:experimentId" element={<Dashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
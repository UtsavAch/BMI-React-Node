import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Calculator from "./components/Calculator";
import IMC from "./components/IMC";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/imc" element={<IMC />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

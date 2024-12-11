import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          navigate("/calculator");
        }}
      >
        Calculator
      </button>
      <button
        onClick={() => {
          navigate("/imc");
        }}
      >
        IMC
      </button>
    </div>
  );
}

export default HomePage;

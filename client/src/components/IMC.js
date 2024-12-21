import React, { useState } from "react";
import NavButton from "./NavButton";
import "../styles/IMC.css";

function IMC() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/calculate-imc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight, height }),
    });

    const data = await response.json();
    setResult(data.imc);
  };

  return (
    <div className="imc-container">
      <h1>IMC Calculator</h1>
      <NavButton text="Home" target={"/"} />
      <form className="imc-form" onSubmit={handleSubmit}>
        <div className="form-input-container">
          <div className="form-input">
            <span>Weight in kg: </span>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <span> Height in cm: </span>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="submit-button" type="submit-button">
          Calculate IMC
        </button>
      </form>
      {result && (
        <p>
          Your IMC: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
}

export default IMC;

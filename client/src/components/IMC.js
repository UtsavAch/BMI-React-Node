import React, { useState } from "react";
import NavButton from "./NavButton";
import "../styles/IMC.css";

function IMC() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResult(null);
    setCategory(null);
    setError(null);

    const response = await fetch("http://localhost:4000/calculate-imc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight, height }),
    });

    const data = await response.json();
    if (response.ok) {
      setResult(data.imc);
      setCategory(data.category);
    } else {
      setError(data.error);
    }
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
        <button className="submit-button" type="submit">
          Calculate IMC
        </button>
      </form>
      <div className="imc-result">
        <p className="imc-result-header">Result</p>
        <div className="imc-result-info">
          {error ? (
            <p className="error-message">{error}</p>
          ) : result ? (
            <>
              <p className="result-message">
                IMC: <span>{result}</span>
              </p>
              <p className="result-message">
                Category: <span>{category}</span>
              </p>
            </>
          ) : (
            <p className="info-message">
              Provide your weight and height to calculate IMC
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default IMC;

import React, { useState } from "react";

function IMC() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/calculate-imc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight, height }),
    });

    const data = await response.json();
    setResult(data.imc);
  };

  return (
    <div>
      <h1>IMC Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Weight (kg):{" "}
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Height (m):{" "}
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Calculate</button>
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

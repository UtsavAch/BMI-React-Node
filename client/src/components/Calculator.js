import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Calculator() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState("0");
  const [currentInput, setCurrentInput] = useState("");

  const handleButtonClick = async (value) => {
    if (value === "C") {
      setCurrentInput("");
      setDisplay("0");
    } else if (value === "=") {
      const response = await fetch("http://localhost:4000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: currentInput }),
      });

      const result = await response.json();

      if (response.ok) {
        setDisplay(result.result);
      } else {
        setDisplay("Error");
      }
    } else {
      const updatedInput = currentInput + value;
      setCurrentInput(updatedInput);
      setDisplay(updatedInput);
    }
  };

  const buttons = [
    ["1", "2", "3", "+"],
    ["4", "5", "6", "-"],
    ["7", "8", "9", "*"],
    ["0", "C", "=", "/"],
  ];

  return (
    <div>
      <h1>Calculator</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <div
        style={{ border: "1px solid black", width: "150px", padding: "10px" }}
      >
        <div id="display" style={{ marginBottom: "10px" }}>
          {display}
        </div>
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((button) => (
              <button
                key={button}
                onClick={() => handleButtonClick(button)}
                style={{ width: "30px", margin: "5px" }}
              >
                {button}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calculator;

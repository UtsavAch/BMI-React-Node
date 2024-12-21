import React, { useState } from "react";
import "../styles/Calculator.css";
import NavButton from "./NavButton";

function Calculator() {
  const [input, setInput] = useState("");

  const calculateResult = () => {
    try {
      const result = evaluateExpression(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const evaluateExpression = (expression) => {
    const tokens = expression.match(/(\d+(\.\d+)?|[+\-*/])/g);
    if (!tokens) throw new Error("Invalid expression");

    const numbers = [];
    const operators = [];

    const precedence = (op) => (op === "+" || op === "-" ? 1 : 2);

    const applyOperation = () => {
      const b = numbers.pop();
      const a = numbers.pop();
      const op = operators.pop();
      switch (op) {
        case "+":
          return numbers.push(a + b);
        case "-":
          return numbers.push(a - b);
        case "*":
          return numbers.push(a * b);
        case "/":
          return numbers.push(a / b);
        default:
          throw new Error("Unknown operator");
      }
    };

    tokens.forEach((token) => {
      if (!isNaN(parseFloat(token))) {
        numbers.push(parseFloat(token));
      } else {
        while (
          operators.length &&
          precedence(operators[operators.length - 1]) >= precedence(token)
        ) {
          applyOperation();
        }
        operators.push(token);
      }
    });

    while (operators.length) {
      applyOperation();
    }

    return numbers[0];
  };

  const handleClick = (value) => {
    if (value === "=") {
      calculateResult();
    } else {
      setInput(input + value);
    }
  };

  const resetCalculator = () => {
    setInput("");
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  return (
    <div className="calculator-container">
      <h1>Calculator</h1>
      <NavButton text="Home" target="/" />
      <div className="calculator">
        <input
          type="text"
          value={input}
          readOnly
          className="calculator-input"
        />
        <div className="calculator-grid">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleClick(button)}
              className="calculator-button"
            >
              {button}
            </button>
          ))}
        </div>
      </div>
      <button onClick={resetCalculator} className="reset-button">
        Reset
      </button>
    </div>
  );
}

export default Calculator;

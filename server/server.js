const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// To calculate IMC
app.post("/calculate-imc", (req, res) => {
  const { weight, height } = req.body;

  if (!weight || !height) {
    return res.status(400).json({ error: "Weight and height are required." });
  }

  if (weight < 0) {
    return res.status(400).json({ error: "The weight cannot be negative." });
  }

  if (height < 0) {
    return res.status(400).json({ error: "The height cannot be negative." });
  }

  if (weight <= 0 || height <= 0) {
    return res
      .status(400)
      .json({ error: "Weight and height must be greater than zero." });
  }

  const heightInMeters = height / 100;

  const imc = weight / (heightInMeters * heightInMeters);
  const roundedImc = Math.round(imc * 100) / 100;

  let category = "";
  if (imc < 18.5) {
    category = "Underweight";
  } else if (imc >= 18.5 && imc < 24.9) {
    category = "Normal weight";
  } else if (imc >= 25 && imc < 29.9) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  res.json({ imc: roundedImc, category });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

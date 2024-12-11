const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

//To calculate IMC
app.post("/calculate-imc", (req, res) => {
  const { weight, height } = req.body;

  if (!weight || !height || weight <= 0 || height <= 0) {
    return res.status(400).json({ error: "Invalid weight or height" });
  }

  const imc = weight / (height * height);
  res.json({ imc });
});

//To calculate math expressions
app.post("/calculate", (req, res) => {
  const { expression } = req.body;

  if (!expression) {
    return res.status(400).json({ error: "No expression provided" });
  }

  const result = eval(expression);
  res.json({ result: result.toString() });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

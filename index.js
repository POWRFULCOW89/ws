const express = require('express');
const helmet = require("helmet");
const db = require("./db");
const dotenv = require("dotenv");
const { WebSocketServer } = require("ws");

dotenv.config();

const app = express();
const port = 3000;

app.set("db", db);
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("login", async (req, res) => {
  const { username, password } = req.body;
  const db = req.app.get("db");

  try {
    const token = await login(db, username, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const ws = new WebSocketServer({ server: app });

function validateParameters(params) {
  const regex = /^[a-zA-Z0-9_]*$/;
  return params.every((param) => regex.test(param));
}
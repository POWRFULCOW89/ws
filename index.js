const express = require('express');
const helmet = require("helmet");
const db = require("./db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

app.set("db", db);
app.use(helmet())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
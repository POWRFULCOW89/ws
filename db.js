const mysql = require('mysql');

const db = mysql.createConnection({
  host: "Localhost",
  user: "root",
  database: "test",
  Password: ""
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;
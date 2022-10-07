const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3xj210tr",
  database: "infinity",
});

db.connect((err) => {
  if (err) {
    console.log(err, "connection failed");
  } else {
    console.log("connected to the db");
  }
});

module.exports = db;

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3xj210tr",
  // database: "infinity",
});

db.connect((err) => {
  if (err) {
    console.log(err, "error");
  } else {
    db.query("CREATE DATABASE IF NOT EXISTS infinity", (err, result) => {
      if (err) {
        console.log(err, "failed to create the database");
      } else {
        console.log("database created successfully");
      }
    });

    db.query("USE infinity", (err, result) => {
      if (err) {
        console.log(err, "cant use the database");
      } else {
        console.log("using the database");
      }
    });
  }
});

module.exports = db;

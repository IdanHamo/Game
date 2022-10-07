const db = require("../service/database");

function getAll(username) {
  const sql = `SELECT * FROM users  WHERE username = '${username}'
 `;
  const myQuery = db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      console.log("result found");
    } else {
      console.log("result doesnt found");
    }
  });

  return myQuery;
}

module.exports = {
  getAll,
};

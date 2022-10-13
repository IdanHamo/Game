const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const generateAuthToken = require("../validation/token");
const validateLoginDetails = require("../validation/login");
const db = require("../service/database");
const auth = require("../middleware/auth");
router.post("/login", async (req, res) => {
  const details = req.body;
  const { error } = validateLoginDetails(details);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const sql = `SELECT * FROM users WHERE username= '${details.username}'`;
  const query = db.query(sql, async (err, results) => {
    if (err) {
      return res.status(500).send({
        ok: false,
        message: "internal error",
      });
    } else {
      if (!results.length) {
        return res.status(500).send({
          ok: false,
          message: "user not found",
        });
      } else {
        const validatePassword = await bcrypt.compare(
          details.password,
          results[0].password
        );
        if (!validatePassword) {
          return res.status(400).send("invalid username or password");
        } else {
          const token = generateAuthToken(results[0].user_id);
          return res.status(200).send(token);
        }
      }
    }
  });
});

router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  const sql = `SELECT * FROM users WHERE user_id = '${userId}'`;
  const query = db.query(sql, async (error, results) => {
    if (error) {
      return res.status(400).send("user does not exist");
    } else {
      console.log(results);
      return res.status(200).send(results[0]);
    }
  });
});
module.exports = router;

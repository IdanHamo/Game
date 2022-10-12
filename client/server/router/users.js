const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validateUser = require("../validation/newUser");
const db = require("../service/database");

router.post("/createUser", async (req, res) => {
  const user = req.body;
  const { error } = validateUser(user);
  if (error) res.status(400).send(error.details[0].message);

  const sql = `SELECT * FROM users WHERE username  = '${user.username}' `;
  const myQuery = db.query(sql, async (err, result) => {
    try {
      if (err) {
        return res.status(500).send({
          ok: false,
          message: "internal error",
        });
      } else {
        if (result.length >= 1) {
          return res
            .status(400)
            .send({
              ok: false,
              message: "username or email is already in use",
            });
        } else {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);

          const insertQuery = "INSERT INTO users SET ?";

          const insert = db.query(insertQuery, user, (err, result) => {
            if (err) {
              return res.status(400).send({
                ok: false,
                message: "email already exists",
              });
            } else {
              return res.status(201).send({
                ok: true,
                message: "user created",
              });
            }
          });
        }
      }
    } catch (e) {
      return res.status(400).send({
        ok: false,
        message: e.message,
      });
    }
  });
});

module.exports = router;

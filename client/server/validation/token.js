const jwt = require("jsonwebtoken");
const config = require("config");

const generateAuthToken = function (id) {
  const token = jwt.sign(id, config.get("jwtKey"));
  return token;
};

module.exports = generateAuthToken;

const Joi = require("joi");

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(400).email().required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(user);
}

module.exports = validateUser;

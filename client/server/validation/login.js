const Joi = require("joi");

function validateLoginDetails(user) {
  const schema = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(user);
}

module.exports = validateLoginDetails;

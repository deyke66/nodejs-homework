const joi = require("joi");

const addContactValidationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.number().required(),
});

module.exports = addContactValidationSchema;

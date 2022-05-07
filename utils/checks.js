const Joi = require('joi');

const schema = Joi.object({
  id: Joi.required(),
});

module.exports = schema;

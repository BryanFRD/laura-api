const Joi = require('joi');

class UserAccountValidator {
  
  static createSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required()
  }).required();
  
}

module.exports = UserAccountValidator;
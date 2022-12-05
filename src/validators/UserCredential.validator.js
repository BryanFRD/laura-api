const Joi = require('joi');
const UserAccountValidator = require('./UserAccount.validator');

class UserCredentialValidator {
  
  static createSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(
      new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,50}$/)
    ).required(),
    user_account: UserAccountValidator.createSchema
  }).required();
  
}

module.exports = UserCredentialValidator;
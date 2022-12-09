const database = require('../../database/database');
const { GraphQLNonNull, GraphQLString } = require('graphql');
const UserCredentialModel = require('../../models/UserCredential.model');
const { UserAccountModel, RoleModel } = require('../../models');
const Token = require('../../helpers/Token.helper');
const UserCredentialValidator = require('../../validators/UserCredential.validator');
const ValidationError = require('../../errors/Validation.error');

const register = {
  type: require('../../types/Void.type'),
  args: {
    token: {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve: async (_, {token}) => {
    const val = Token.verifyEmailToken(token);
    
    const {value, error} = UserCredentialValidator.createSchema.validate(val, {stripUnknown: true});
    
    if(error){
      throw new ValidationError(error);
    }
    
    const transaction = await database.transaction();
    
    const {err} = await UserCredentialModel.create(
      value,
      {
        transaction,
        include: [UserAccountModel]
      })
      .then(() => {
        transaction.commit();
        return {};
      }, err => {
        transaction.rollback();
        return {err};
      });
    
    if(err){
      throw new Error(err);
    }
    
    return;
  }
}

module.exports = { register }
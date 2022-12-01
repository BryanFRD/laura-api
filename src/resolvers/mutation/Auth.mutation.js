const database = require('../../database/database');
const { GraphQLNonNull, GraphQLString } = require('graphql');
const UserCredentialModel = require('../../models/UserCredential.model');
const { UserAccountModel } = require('../../models');

const register = {
  type: require('../../types/UserAccount.type'),
  args: {
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    firstname: {type: new GraphQLNonNull(GraphQLString)},
    lastname: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (_, {email, password, firstname, lastname}) => {
    const transaction = await database.transaction({autocommit: false});
    
    const {value, error} = await UserCredentialModel.create(
      {email, password, user_account: {firstname, lastname}},
      {transaction, include: UserAccountModel})
      .then(value => {
        transaction.commit();
        return {value};
      }, error => {
        transaction.rollback();
        return {error};
      });
      
    if(error){
      throw new Error(error)
    }
      
    return value;
  }
}

module.exports = { register }
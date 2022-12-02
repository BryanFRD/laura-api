const { GraphQLString, GraphQLNonNull } = require('graphql');
const UserCredentialModel = require('../../models/UserCredential.model');

const login = {
  type: require('../../types/UserAccount.type'),
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (_, {email, password}, {res}) => {
    const userCredential = await UserCredentialModel.findOne({where: {email}});
    
    if(userCredential?.authenticate(password)){
      return userCredential;
    }
    
    return null;
  }
}

module.exports = { login }
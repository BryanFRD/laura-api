const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const BaseType = require('./Base.type');
const RoleType = require('./Role.type');

const UserAccountType = new GraphQLObjectType({
  name: 'useraccount',
  fields: () => ({
    ...BaseType,
    firstname: {type: GraphQLString},
    lastname: {type: GraphQLString},
    role: {
      type: RoleType,
      resolve: (root) => {
        
        
        return null;
      }
    }
  })
});

module.exports = UserAccountType;
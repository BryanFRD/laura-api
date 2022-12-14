const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } = require('graphql');
const Config = require('../configs/Config');
const BaseType = require('./Base.type');

const RoleType = new GraphQLObjectType({
  name: 'role',
  fields: () => ({
    ...BaseType,
    title: {type: GraphQLString},
    weight: {type: GraphQLInt},
    isAdmin: {
      type: GraphQLBoolean,
      resolve: (role) => {
        return Config.isAdmin({role});
      }
    }
  })
});

module.exports = RoleType;
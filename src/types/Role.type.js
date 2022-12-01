const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');
const BaseType = require('./Base.type');

const RoleType = new GraphQLObjectType({
  name: 'role',
  extensions: BaseType,
  fields: () => ({
    ...BaseType,
    title: {type: GraphQLString},
    weight: {type: GraphQLInt}
  })
});

module.exports = RoleType;
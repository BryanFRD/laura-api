const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');
const BaseType = require('./Base.type');

const RoleType = new GraphQLObjectType({
  name: 'role',
  fields: () => ({
    ...BaseType,
    title: {type: GraphQLString},
    weight: {type: GraphQLInt}
  })
});

module.exports = RoleType;
const { GraphQLID, GraphQLString } = require('graphql');

const BaseType = {
    id: {type: GraphQLID},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    deletedAt: {type: GraphQLString}
  }

module.exports = BaseType;
const { GraphQLID, GraphQLString, GraphQLEnumType } = require('graphql');

const BaseType = {
    id: {type: GraphQLID},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    deletedAt: {type: GraphQLString},
    status: {type: new GraphQLEnumType({
      name: 'status',
      values: {
        SUCCESS: {value: 'SUCCESS'},
        NOT_FOUND: {value: 'NOT_FOUND'},
        UNAUTHORIZED: {value: 'UNAUTHORIZED'},
        ERROR: {value: 'ERROR'}
      }
    })
  }
}

module.exports = BaseType;
const { GraphQLID, GraphQLString } = require('graphql');
const { StatusField } = require('./Status.type');

const BaseType = {
    id: {type: GraphQLID},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    deletedAt: {type: GraphQLString},
    ...StatusField
}

module.exports = BaseType;
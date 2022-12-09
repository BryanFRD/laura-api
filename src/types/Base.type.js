const { GraphQLID, GraphQLString } = require('graphql');
const { GraphQLDateTime } = require('graphql-scalars');

const BaseType = {
    id: {type: GraphQLID},
    createdAt: {type: GraphQLDateTime},
    updatedAt: {type: GraphQLDateTime},
    deletedAt: {type: GraphQLDateTime}
}

module.exports = BaseType;
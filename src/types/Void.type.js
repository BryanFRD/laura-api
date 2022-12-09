const { GraphQLObjectType, GraphQLBoolean } = require('graphql');

const VoidType = new GraphQLObjectType({
  name: 'void',
  fields: () => ({
    void: {type: GraphQLBoolean}
  })
});

module.exports = VoidType;
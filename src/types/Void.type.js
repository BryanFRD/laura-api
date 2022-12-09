const { GraphQLScalarType } = require('graphql');

const VoidType = new GraphQLScalarType({
  name: 'void',
  description: 'Represents void return.',
  serialize: () => {
    return null;
  },
  parseValue: () => {
    return null;
  },
  parseLiteral: () => {
    return null;
  }
});

module.exports = VoidType;
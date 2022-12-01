const { GraphQLSchema } = require('graphql');
const query = require('./Query.schema');
const mutation = require('./Mutation.schema');

const schema = new GraphQLSchema({
  query,
  mutation
});

module.exports = schema;
const { GraphQLObjectType } = require('graphql');
const authQueries = require('../resolvers/query/Auth.query');
const articleQueries = require('../resolvers/query/Article.query');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...authQueries,
    ...articleQueries
  }
});

module.exports = query;
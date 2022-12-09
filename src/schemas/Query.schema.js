const { GraphQLObjectType } = require('graphql');
const authQueries = require('../resolvers/query/Auth.query');
const articleQueries = require('../resolvers/query/Article.query');
const categoryQueries = require('../resolvers/query/Category.query');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...authQueries,
    ...categoryQueries,
    ...articleQueries
  }
});

module.exports = query;
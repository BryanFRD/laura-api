const { GraphQLObjectType } = require('graphql');
const authQueries = require('../resolvers/query/Auth.query');
const categoryQueries = require('../resolvers/query/Category.query');
const tagQueries = require('../resolvers/query/Tag.query');
const articleQueries = require('../resolvers/query/Article.query');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...authQueries,
    ...categoryQueries,
    ...tagQueries,
    ...articleQueries
  }
});

module.exports = query;
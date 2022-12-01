const { GraphQLObjectType } = require('graphql');
const authMutations = require('../resolvers/mutation/Auth.mutation');
const articleMutations = require('../resolvers/mutation/Article.mutation');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...authMutations,
    ...articleMutations
  })
});

module.exports = mutation;
const { GraphQLObjectType } = require('graphql');
const authMutations = require('../resolvers/mutation/Auth.mutation');
const categoryMutations = require('../resolvers/mutation/Category.mutation');
const articleMutations = require('../resolvers/mutation/Article.mutation');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...authMutations,
    ...categoryMutations,
    ...articleMutations
  })
});

module.exports = mutation;
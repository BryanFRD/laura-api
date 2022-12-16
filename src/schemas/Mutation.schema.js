const { GraphQLObjectType } = require('graphql');
const authMutations = require('../resolvers/mutation/Auth.mutation');
const categoryMutations = require('../resolvers/mutation/Category.mutation');
const tagMutations = require('../resolvers/mutation/Tag.mutation');
const articleMutations = require('../resolvers/mutation/Article.mutation');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...authMutations,
    ...categoryMutations,
    ...tagMutations,
    ...articleMutations
  })
});

module.exports = mutation;
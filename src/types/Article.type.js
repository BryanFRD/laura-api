const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } = require('graphql');
const BaseType = require('./Base.type');

const ArticleType = new GraphQLObjectType({
  name: 'article',
  fields: () => ({
    ...BaseType,
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    brand: {type: GraphQLString},
    state: {type: GraphQLString},
    price: {type: GraphQLFloat},
    size: {type: GraphQLString},
    purchasedAt: {type: GraphQLString}
  })
});

module.exports = ArticleType;
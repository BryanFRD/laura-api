const database = require('../../database/database');
const { GraphQLNonNull, GraphQLString, GraphQLFloat } = require('graphql');

const createArticle = {
  type: require('../../types/Article.type'),
  args: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: GraphQLString},
    brand: {type: GraphQLString},
    state: {type: GraphQLString},
    price: {type: new GraphQLNonNull(GraphQLFloat)},
    size: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (_, {title, description, brand, state, price, size}) => {
    
    
    return null;
  }
}

module.exports = { createArticle}
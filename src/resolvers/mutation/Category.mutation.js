const database = require('../../database/database');
const { GraphQLNonNull, GraphQLString, GraphQLFloat } = require('graphql');

const createCategory = {
  type: require('../../types/Article.type'),
  args: {
    title: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (_, {title}) => {
    
    
    return null;
  }
}

module.exports = { createCategory }
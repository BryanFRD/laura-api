const database = require('../../database/database');
const { GraphQLNonNull, GraphQLString } = require('graphql');

const createTag = {
  type: require('../../types/Tag.type'),
  args: {
    title: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (_, {title}) => {
    
    
    return null;
  }
}

module.exports = { createTag }
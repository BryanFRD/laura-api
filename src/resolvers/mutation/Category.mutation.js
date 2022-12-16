const database = require('../../database/database');
const { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const createCategory = {
  type: require('../../types/Category.type'),
  args: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    showOrder: {type: new GraphQLNonNull(GraphQLInt)},
    tags: {type: new GraphQLList(GraphQLInt)}
  },
  resolve: async (_, {title, showOrder, tags}) => {
    console.log('create Category', title, showOrder, tags);
    
    return null;
  }
}

module.exports = { createCategory }
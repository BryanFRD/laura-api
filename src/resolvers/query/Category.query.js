const { GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const NotFoundError = require('../../errors/NotFound.error');
const CategoryModel = require('../../models/Category.model');

const getCategory = {
  type: require('../../types/Category.type'),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_, {id}) => {
    const category = await CategoryModel.findByPk(id);
    
    if(!category)
      throw new NotFoundError();
    
    return category;
  }
}

const getCategories = {
  type: new GraphQLList(require('../../types/Category.type')),
  resolve: async () => {
    const categories = await CategoryModel.findAll();
    return categories;
  }
}

module.exports = { getCategory, getCategories }
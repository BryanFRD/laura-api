const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');
const CategoryModel = require('../models/Category.model');
const TagModel = require('../models/Tag.model');
const BaseType = require('./Base.type');

const TagType = new GraphQLObjectType({
  name: 'category',
  fields: () => ({
    ...BaseType,
    title: {type: GraphQLString},
    showOrder: {type: GraphQLInt},
    tags: {
      type: GraphQLList(require('./Tag.type')),
      resolve: async ({id}) => {
        const category = await CategoryModel.findByPk(id, {include: [TagModel]});
        return category.toJSON().tags;
      }
    }
  })
});

module.exports = TagType;
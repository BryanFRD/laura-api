const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');
const ArticleModel = require('../models/Article.model');
const CategoryModel = require('../models/Category.model');
const TagModel = require('../models/Tag.model');
const BaseType = require('./Base.type');

const TagType = new GraphQLObjectType({
  name: 'tag',
  fields: () => ({
    ...BaseType,
    title: {type: GraphQLString},
    showOrder: {type: GraphQLInt},
    articles : {
      type: GraphQLList(require('./Article.type')),
      resolve: async ({id}) => {
        const tag = await TagModel.findByPk(id, {include: [ArticleModel]});
        return tag.toJSON().articles;
      }
    },
    categories: {
      type: GraphQLList(require('./Category.type')),
      resolve: async ({id}) => {
        const tag = await TagModel.findByPk(id, {include: [CategoryModel]});
        return tag.toJSON().categories;
      }
    }
  })
});

module.exports = TagType;
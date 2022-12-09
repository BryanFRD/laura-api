const { GraphQLObjectType, GraphQLString } = require('graphql');
const ArticleModel = require('../models/Article.model');
const BaseType = require('./Base.type');

const ImageType = new GraphQLObjectType({
  name: 'image',
  fields: () => ({
    ...BaseType,
    src: {type: GraphQLString},
    alt: {type: GraphQLString},
    article: {
      type: require('./Article.type'),
      resolve: async ({articleId}) => {
        const article = ArticleModel.findByPk(articleId);
        return article?.toJSON();
      }
    }
  })
});

module.exports = ImageType;
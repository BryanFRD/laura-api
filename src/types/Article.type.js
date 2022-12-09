const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLFloat } = require('graphql');
const ArticleModel = require('../models/Article.model');
const ArticleUserAccountModel = require('../models/ArticleUserAccount.model');
const ImageModel = require('../models/Image.model');
const TagModel = require('../models/Tag.model');
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
    purchasedAt: {type: GraphQLString},
    tags: {
      type: GraphQLList(require('./Tag.type')),
      resolve: async ({id}) => {
        const article = await ArticleModel.findByPk(id, {include: [TagModel]});
        return article.toJSON().tags;
      }
    },
    images: {
      type: GraphQLList(require('./Image.type')),
      resolver: async ({id}) => {
        const images = await ImageModel.findAll({where: {articleId: id}});
        return images;
      }
    },
    userArticle: {
      type: GraphQLList(require('./UserArticle.type')),
      resolve: async ({id}) => {
        const userArticle = ArticleUserAccountModel.findAll({where: {articleId: id}});
        return userArticle?.toJSON();
      }
    }
  })
});

module.exports = ArticleType;
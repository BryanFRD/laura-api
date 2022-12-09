const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql');
const ArticleModel = require('../models/Article.model');
const UserAccountModel = require('../models/UserAccount.model');
const BaseType = require('./Base.type');

const UserArticleType = new GraphQLObjectType({
  name: 'userArticle',
  fields: () => ({
    ...BaseType,
    favorite: {type: GraphQLBoolean},
    cart: {type: GraphQLBoolean},
    bought: {type: GraphQLString},
    user: {
      type: require('./UserAccount.type'),
      resolve: async ({userAccountId}) => {
        const user = await UserAccountModel.findByPk(userAccountId);
        return user?.toJSON();
      }
    },
    article: {
      type: require('./Article.type'),
      resolve: async ({articleId}) => {
        const article = await ArticleModel.findByPk(articleId);
        return article?.toJSON();
      }
    }
  })
});

module.exports = UserArticleType;
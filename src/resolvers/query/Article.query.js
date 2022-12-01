const { GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const ArticleModel = require('../../models/Article.model');

const getArticle = {
  type: require('../../types/Article.type'),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (_, {id}) => ArticleModel.findByPk(id)
}

const getArticles = {
  type: new GraphQLList(require('../../types/Article.type')),
  resolve: () => ArticleModel.findAll()
}

module.exports = { getArticle, getArticles }
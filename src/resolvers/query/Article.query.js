const { GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const ArticleModel = require('../../models/Article.model');

const getArticle = {
  type: require('../../types/Article.type'),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (_, {id}) => {
    const article = await ArticleModel.findByPk(id);
    return article?.toJSON();
  }
}

const getArticles = {
  type: new GraphQLList(require('../../types/Article.type')),
  resolve: async () => {
    const articles = await ArticleModel.findAll();
    
    return articles;
  }
}

module.exports = { getArticle, getArticles }
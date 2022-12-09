const database = require('../database/database');
const { Model } = require('sequelize');

class ArticleTagModel extends Model {}

ArticleTagModel.init({},
{
  sequelize: database,
  modelName: 'article_tag',
  paranoid: false
});

module.exports = ArticleTagModel;
const database = require('../database/database');
const { Model } = require('sequelize');

class ArticleCategoryModel extends Model {}

ArticleCategoryModel.init({},
{
  sequelize: database,
  modelName: 'article_category',
  paranoid: false
});

module.exports = ArticleCategoryModel;
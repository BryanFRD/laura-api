const database = require('../database/database');
const { Model } = require('sequelize');

class CategoryTagModel extends Model {}

CategoryTagModel.init({},
{
  sequelize: database,
  modelName: 'category_tag',
  paranoid: false
});

module.exports = CategoryTagModel;
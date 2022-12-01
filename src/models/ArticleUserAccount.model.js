const database = require('../database/database');
const { Model, DataTypes } = require('sequelize');

class ArticleUserAccountModel extends Model {}

ArticleUserAccountModel.init({
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  cart: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  bought: {
    type: DataTypes.DATE
  }
},
{
  sequelize: database,
  modelName: 'article_user_account'
});

module.exports = ArticleUserAccountModel;
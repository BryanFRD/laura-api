const database = require('../database/database');
const { Model, DataTypes } = require('sequelize');
const ImageModel = require('./Image.model');
const CategoryModel = require('./Category.model');
const ArticleCategoryModel = require('./ArticleCategory.model');

class ArticleModel extends Model {}

ArticleModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  purchasedAt: {
    type: DataTypes.DATE
  },
},
{
  sequelize: database,
  modelName: 'article',
  paranoid: true
});

ArticleModel.hasMany(ImageModel);
ImageModel.belongsTo(ArticleModel);

ArticleModel.hasMany(CategoryModel);
CategoryModel.belongsToMany(ArticleModel, {through: ArticleCategoryModel});

module.exports = ArticleModel;
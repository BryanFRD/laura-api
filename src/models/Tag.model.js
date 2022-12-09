const database = require('../database/database');
const { Model, DataTypes } = require('sequelize');
const CategoryModel = require('./Category.model');
const CategoryTagModel = require('./CategoryTag.model');

class TagModel extends Model {}

TagModel.init({
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
  showOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
},
{
  sequelize: database,
  modelName: 'tag',
  paranoid: true
});

TagModel.belongsToMany(CategoryModel, {through: CategoryTagModel});
CategoryModel.belongsToMany(TagModel, {through: CategoryTagModel});

module.exports = TagModel;
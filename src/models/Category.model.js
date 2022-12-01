const database = require('../database/database');
const { Model, DataTypes } = require('sequelize');

class CategoryModel extends Model {}

CategoryModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize: database,
  modelName: 'category',
  paranoid: true
});

module.exports = CategoryModel;
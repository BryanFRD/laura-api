const database = require('../database/database');
const { Model, DataTypes } = require('sequelize');

class ImageModel extends Model {}

ImageModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize: database,
  modelName: 'image',
  paranoid: true
});

module.exports = ImageModel;
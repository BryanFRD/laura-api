const database = require('../database/database');
const { Model, DataTypes } = require('sequelize');

class RoleModel extends Model {}

RoleModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    defaultValue: 'User',
    allowNull: false
  },
  weight: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
},
{
  sequelize: database,
  modelName: 'role',
  paranoid: true
});

module.exports = RoleModel;
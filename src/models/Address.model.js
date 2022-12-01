const database = require('../database/database');
const { Model, DataTypes } = require('sequelize');

class AddressModel extends Model {}

AddressModel.init({
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
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  complement: {
    type: DataTypes.STRING
  },
  information: {
    type: DataTypes.STRING,
  },
},
{
  sequelize: database,
  modelName: 'Address',
  paranoid: true
});

module.exports = AddressModel;
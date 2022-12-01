const database = require('../database/database');
const { Model, DataTypes } = require('sequelize');
const ArticleModel = require('./Article.model');
const AddressModel = require('./Address.model');

class InvoiceModel extends Model {}

InvoiceModel.init({
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
  modelName: 'invoice',
  paranoid: true
});

ArticleModel.hasOne(InvoiceModel);
InvoiceModel.belongsTo(ArticleModel);

AddressModel.hasOne(InvoiceModel);
InvoiceModel.belongsTo(AddressModel);

module.exports = InvoiceModel;
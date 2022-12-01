const database = require('../database/database');
const { Model, DataTypes } = require('sequelize');
const RoleModel = require('./Role.model');
const ArticleModel = require('./Article.model');
const ArticleUserAccountModel = require('./ArticleUserAccount.model');
const AddressModel = require('./Address.model');
const InvoiceModel = require('./Invoice.model');

class UserAccountModel extends Model {}

UserAccountModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize: database,
  modelName: 'user_account',
  paranoid: true
});

RoleModel.hasMany(UserAccountModel);
UserAccountModel.belongsTo(RoleModel);

UserAccountModel.belongsToMany(ArticleModel, {
  through: ArticleUserAccountModel
});
ArticleModel.belongsToMany(UserAccountModel, {
  through: ArticleUserAccountModel
});

UserAccountModel.hasMany(AddressModel);
AddressModel.belongsTo(UserAccountModel);

UserAccountModel.hasMany(InvoiceModel);
InvoiceModel.belongsTo(UserAccountModel);

module.exports = UserAccountModel;
const database = require('../database/database');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const UserAccountModel = require('./UserAccount.model');

class UserCredentialModel extends Model {
  
  authenticate = (password) => {
    return bcrypt.compareSync(password, process.env.PASSWORD_PREFIX + this.getDataValue('password'));
  }
  
}

UserCredentialModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10).replace(process.env.PASSWORD_PREFIX, ''));
    },
    get() {
      return 'password';
    }
  }
}, {
  indexes: [
    {unique: true, fields: ['email']}
  ],
  sequelize: database,
  modelName: 'user_credential',
  paranoid: true
});

UserAccountModel.hasOne(UserCredentialModel);
UserCredentialModel.belongsTo(UserAccountModel);

module.exports = UserCredentialModel;
const { GraphQLString, GraphQLNonNull } = require('graphql');
const database = require('../../database/database');
const UnauthorizedError = require('../../errors/Unauthorized.error');
const Token = require('../../helpers/Token.helper');
const { UserAccountModel, RoleModel, UserCredentialModel } = require('../../models');
const UserAccountType = require('../../types/UserAccount.type');
const UserCredentialValidator = require('../../validators/UserCredential.validator');
const ValidationError = require('../../errors/Validation.error');
const Mailer = require('../../helpers/Mailer.helper.js');
const VoidType = require('../../types/Void.type')

const register = {
  type: VoidType,
  args: {
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    firstname: {type: new GraphQLNonNull(GraphQLString)},
    lastname: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (_, {email, password, firstname, lastname}) => {
    const {value, error} = UserCredentialValidator.createSchema.validate({email, password, user_account: {firstname, lastname}});
    
    if(error)
      throw new ValidationError(error);
    
    const transaction = await database.transaction();
    const {err} = await UserCredentialModel.create(value,
      {transaction, include: UserAccountModel})
      .then(() => {
        transaction.rollback();
        
        const token = Token.generateEmailToken(value);
        Mailer.sendAccountCreationMail(value.email, token);
        
        return {};
      }, err => {
        transaction.rollback();
        return {err};
      });
    
    if(err){
      throw err;
    }
    
    return;
  }
}

const login = {
  type: VoidType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (_, {email, password}, {res}) => {
    const userCredential = await UserCredentialModel.findOne({
      where: {email},
      include: [
        UserAccountModel,
        {model: UserAccountModel, include: RoleModel}
      ]
    });
    
    if(userCredential?.authenticate(password)){
      const authTokenData = {id: userCredential.id, updatedAt: userCredential.updatedAt}
      const accessTokenData = {id: userCredential.user_account.id, role: userCredential.user_account.role}
      
      const authToken = Token.generateAuthToken(authTokenData);
      const accessToken = Token.generateAccessToken(accessTokenData);
      
      res.cookie('authToken', authToken.token, {
        maxAge: authToken.expires,
        signed: true
      });
      
      res.cookie('accessToken', accessToken.token, {
        maxAge: accessToken.expires,
        signed: true
      });
      
      return userCredential.toJSON().user_account;
    }
    
    throw new UnauthorizedError();
  }
}

const renewToken = {
  type: UserAccountType,
  resolve: async (_, __, {signedCookies, res}) => {
    const data = Token.verifyAuthToken(signedCookies.authToken);
    
    const user = await UserCredentialModel.findByPk(data?.id, {
      include: [
        UserAccountModel,
        {model: UserAccountModel, include: RoleModel}
      ]
    });
    
    if(!data || !user || new Date(data.updatedAt).getTime() !== new Date(user?.updatedAt).getTime()){
      res.clearCookie('authToken');
      res.clearCookie('accessToken');
      
      throw new UnauthorizedError();
    }
    
    const authTokenData = {id: user.id, updatedAt: user.updatedAt}
    const accessTokenData = {id: user.user_account.id, role: user.user_account.role}
    
    const authToken = Token.generateAuthToken(authTokenData);
    const accessToken = Token.generateAccessToken(accessTokenData);
    
    res.cookie('authToken', authToken.token, {
      maxAge: authToken.expires,
      signed: true
    });
    
    res.cookie('accessToken', accessToken.token, {
      maxAge: accessToken.expires,
      signed: true
    });
    
    return user.toJSON().user_account;
  }
}

module.exports = { register, login, renewToken }
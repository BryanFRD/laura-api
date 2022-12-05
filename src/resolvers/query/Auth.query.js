const { GraphQLString, GraphQLNonNull } = require('graphql');
const UnauthorizedError = require('../../errors/Unauthorized.error');
const Token = require('../../helpers/Token.helper');
const { UserAccountModel, RoleModel } = require('../../models');
const UserCredentialModel = require('../../models/UserCredential.model');
const UserAccountType = require('../../types/UserAccount.type');

const login = {
  type: UserAccountType,
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
      
      return userCredential.toJSON();
    }
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

module.exports = { login, renewToken }
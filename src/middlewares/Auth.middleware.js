const { RESTRICTED_ROUTES } = require('../configs/Config');
const Token = require('../helpers/Token.helper');

const authMiddleware = async (resolve, parent, args, context, info) => {
  const field = info.fieldName;
  const condition = RESTRICTED_ROUTES[field];
  
  if(condition){
    const { accessToken } = context.signedCookies;
    const user = Token.verifyAccessToken(accessToken);
    
    if(user && condition({user})){
      return await resolve(parent, args, context, info);
    }
    
    throw new Error('Not Authorized');
  }
  
  return await resolve(parent, args, context, info);
}

module.exports = authMiddleware;
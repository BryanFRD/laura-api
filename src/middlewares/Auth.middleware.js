const { RESTRICTED_ROUTES } = require('../configs/Config');

const authMiddleware = async (resolve, parent, args, context, info) => {
  const field = info.fieldName;
  console.log('field:', field);
  const condition = RESTRICTED_ROUTES[field];
  console.log('condition:', condition);
  
  const accessToken = context.signedCookies;
  console.log('accessToken:', accessToken);
  if(condition){
    
  }
  
  return await resolve(parent, args, context, info);
}
module.exports = authMiddleware;
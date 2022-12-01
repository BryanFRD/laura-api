const { RESTRICTED_ROUTES } = require('../configs/Config');

const authMiddleware = async (resolve, parent, args, context, info) => {
  const path = info.path;
  console.log('path:', path.prevgraph);
  const key = info.path;
  const condition = RESTRICTED_ROUTES[key];
  
  console.log('context.verified:', context.verified);
  context.verified = true;
  
  return await resolve(parent, args, context, info);
}
module.exports = authMiddleware;
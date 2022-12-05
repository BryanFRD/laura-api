const statusHandlerMiddleware = async (resolve, parent, args, context, info) => {
  try {
    const result = await resolve(parent, args, context, info);
    
    if(Array.isArray(result))
      return result;
    
    return {...result, status: 'SUCCESS'}
  } catch(error) {
    return {status: error.STATUS ?? 'ERROR'}
  }
}

module.exports = statusHandlerMiddleware;
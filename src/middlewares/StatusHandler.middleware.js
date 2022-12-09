const statusHandlerMiddleware = async (resolve, parent, args, context, info) => {
  try {
    const result = await resolve(parent, args, context, info);
    
    return result;
  } catch(error) {
    context.res.status(error.status ?? 400)
    throw error;
  }
}

module.exports = statusHandlerMiddleware;
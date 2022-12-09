class UnauthorizedError extends Error {
  
  message = 'Unauthorized';
  status = 401;
  
}

module.exports = UnauthorizedError;
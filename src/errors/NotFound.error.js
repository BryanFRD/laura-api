class NotFoundError extends Error {
  
  message = 'Not found';
  status = 404;
  
}

module.exports = NotFoundError;
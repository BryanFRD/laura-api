class ValidationError extends Error {
  
  message = 'Validation error';
  status = 400;
  
}

module.exports = ValidationError;
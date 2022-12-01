const jwt = require('jsonwebtoken');

class Token {
  
  generateAuthToken = (data) => {
    return this.#generateToken(data, process.env.AUTH_SECRET, {expiresIn: '30d'});
  }
  
  generateAccessToken = (data) => {
    return this.#generateToken(data, process.env.ACCESS_SECRET, {expiresIn: '1d'});
  }
  
  generateEmailToken = (data) => {
    return this.#generateToken(data, process.env.EMAIL_SECRET, {expiresIn: '7d'});
  }
  
  #generateToken = (data, secret, options) => {
    return jwt.sign(data, secret, options)
  }
  
  verifyAuthToken = (token) => {
    return this.#verifyToken(token, process.env.AUTH_SECRET);
  }
  
  verifyAccessToken = (token) => {
    return this.#verifyToken(token, process.env.ACCESS_SECRET);
  }
  
  verifyEmailToken = (token) => {
    return this.#verifyToken(token, process.env.EMAIL_SECRET);
  }
  
  #verifyToken = (token, secret) => {
    return jwt.verify(token, secret, (err, data) => {
      if(!err)
        return data;
    });
  }
  
}

module.exports = Token;
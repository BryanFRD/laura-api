const jwt = require('jsonwebtoken');

class Token {
  
  static generateAuthToken = (data) => {
    return this.#generateToken(data, process.env.AUTH_SECRET, 30);
  }
  
  static generateAccessToken = (data) => {
    return this.#generateToken(data, process.env.ACCESS_SECRET, 1);
  }
  
  static generateEmailToken = (data) => {
    return this.#generateToken(data, process.env.EMAIL_SECRET, 7);
  }
  
  static #generateToken = (data, secret, expires) => {
    expires *= 24 * 60 * 60 * 1000;
    
    return {token: jwt.sign(data, secret, {expiresIn: expires}), expires}
  }
  
  static verifyAuthToken = (token) => {
    return this.#verifyToken(token, process.env.AUTH_SECRET);
  }
  
  static verifyAccessToken = (token) => {
    return this.#verifyToken(token, process.env.ACCESS_SECRET);
  }
  
  static verifyEmailToken = (token) => {
    return this.#verifyToken(token, process.env.EMAIL_SECRET);
  }
  
  static #verifyToken = (token, secret) => {
    return jwt.verify(token, secret, (err, data) => {
      if(!err)
        return data;
    });
  }
  
}

module.exports = Token;
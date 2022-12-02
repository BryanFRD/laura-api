const jwt = require('jsonwebtoken');

class Token {
  
  static generateAuthToken = (data) => {
    return this.#generateToken(data, process.env.AUTH_SECRET, {expiresIn: '30d'});
  }
  
  static generateAccessToken = (data) => {
    return this.#generateToken(data, process.env.ACCESS_SECRET, {expiresIn: '1d'});
  }
  
  static generateEmailToken = (data) => {
    return this.#generateToken(data, process.env.EMAIL_SECRET, {expiresIn: '7d'});
  }
  
  static #generateToken = (data, secret, options) => {
    return jwt.sign(data, secret, options)
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
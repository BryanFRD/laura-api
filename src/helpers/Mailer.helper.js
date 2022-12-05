const nodemailer = require('nodemailer');
const Config = require('../configs/Config');
const Logger = require("./Logger.helper");

class Mailer {
  
  static #transporter;
  
  static getTransporter = (name) => {
    if(!this.#transporter){
      this.#transporter = {};
      for(const mail in Config.mail){
        try {
          this.#transporter[mail] = nodemailer.createTransport(Config.mail[mail]);
        } catch (error) {
          Logger.error(`TransporterError: (${mail}) `, error);
        }
      }
    }
    
    return this.#transporter[name];
  }
  
  static sendAccountCreationMail = (email, token) => {
    this.#sendMail('accountCreation', email, {token});
  }
  
  static sendForgotPasswordMail = (email, token) => {
    this.#sendMail('forgotPassword', email, {token});
  }
  
  static #sendMail = async (name, to, options) => {
    const transporter = this.getTransporter(name);
    
    if(!transporter){
      Logger.error('Couldn\'t get transporter!');
      return;
    }
    
    transporter.verify((error) => {
      if(!error) {
        transporter.sendMail({
          ...transporter.options.mailOptions(options),
          to
        });
      } else {
        Logger.error(`sendMailError: (${name}) `, error);
      }
    })
  }
  
}

module.exports = Mailer;
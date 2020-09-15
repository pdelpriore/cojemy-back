const jwt = require("jsonwebtoken");
const cryptoJS = require("crypto-js");
const { strings } = require("../strings/Strings");
require("dotenv").config();

const verifyToken = (userId, email, token, authType) => {
  return new Promise((resolve, reject) => {
    const tokenDecrypted = cryptoJS.AES.decrypt(
      token,
      process.env.JWT_ENCRYPTION_KEY
    ).toString(cryptoJS.enc.Utf8);
    if (authType === strings.tokenVerification.USER_AUTH) {
      jwt.verify(tokenDecrypted, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded && decoded.email === email && decoded.userId === userId) {
          resolve();
        } else {
          reject();
        }
      });
    } else if (authType === strings.tokenVerification.EMAIL_CONFIRM) {
      jwt.verify(tokenDecrypted, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded && decoded.email === email) {
          resolve();
        } else {
          reject();
        }
      });
    }
  });
};

module.exports = { verifyToken };

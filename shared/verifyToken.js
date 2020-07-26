const jwt = require("jsonwebtoken");
const cryptoJS = require("crypto-js");
const { jwtSecret, jwtEncryptionKey } = require("../config/security/Security");
const { strings } = require("../strings/Strings");

const verifyToken = (userId, email, token, authType) => {
  return new Promise((resolve, reject) => {
    const tokenDecrypted = cryptoJS.AES.decrypt(
      token,
      jwtEncryptionKey
    ).toString(cryptoJS.enc.Utf8);
    if (authType === strings.tokenVerification.USER_AUTH) {
      jwt.verify(tokenDecrypted, jwtSecret, (err, decoded) => {
        if (decoded && decoded.email === email && decoded.userId === userId) {
          resolve();
        } else {
          reject();
        }
      });
    } else if (authType === strings.tokenVerification.EMAIL_CONFIRM) {
      jwt.verify(tokenDecrypted, jwtSecret, (err, decoded) => {
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

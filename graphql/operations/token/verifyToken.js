const jwt = require("jsonwebtoken");
import * as jwtEncrypt from "jwt-token-encrypt";
const {
  jwtSecret,
  jwtEncryptionKey,
} = require("../../../config/security/Security");
const { strings } = require("../../../strings/Strings");

const verifyToken = (userId, email, token, authType) => {
  return new Promise((resolve, reject) => {
    if (authType === strings.tokenVerification.USER_AUTH) {
      const decoded = jwtEncrypt.readJWT(token, {
        key: jwtEncryptionKey,
        algorithm: "aes-256-cbc",
      });
      console.log(decoded);
      // if (decoded && decoded.email === email && decoded.userId === userId) {
      //   resolve();
      // } else {
      //   reject(strings.errors.token.ERROR);
      // }
      // jwt.verify(token, jwtSecret, (err, decoded) => {
      //   if (decoded && decoded.email === email && decoded.userId === userId) {
      //     resolve();
      //   } else {
      //     reject(strings.errors.token.ERROR);
      //   }
      // });
    } else if (authType === strings.tokenVerification.EMAIL_CONFIRM) {
      const decoded = jwtEncrypt.readJWT(token, {
        key: jwtEncryptionKey,
        algorithm: "aes-256-cbc",
      });
      // if (decoded && decoded.email === email) {
      //   resolve();
      // } else {
      //   reject(strings.errors.token.ERROR);
      // }
      // jwt.verify(token, jwtSecret, (err, decoded) => {
      //   if (decoded && decoded.email === email) {
      //     resolve();
      //   } else {
      //     reject(strings.errors.token.ERROR);
      //   }
      // });
    }
  });
};

module.exports = { verifyToken };

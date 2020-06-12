const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config/security/Security");
const { strings } = require("../../../strings/Strings");

const verifyToken = (userId, email, token, authType) => {
  return new Promise((resolve, reject) => {
    if (authType === strings.tokenVerification.USER_AUTH) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (decoded && decoded.email === email && decoded.userId === userId) {
          resolve();
        } else {
          reject(strings.errors.token.ERROR);
        }
      });
    } else if (authType === strings.tokenVerification.EMAIL_CONFIRM) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (decoded && decoded.email === email) {
          resolve();
        } else {
          reject(strings.errors.token.ERROR);
        }
      });
    }
  });
};

module.exports = { verifyToken };

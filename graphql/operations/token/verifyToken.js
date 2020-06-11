const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config/security/Security");
const { strings } = require("../../../strings/Strings");

const verifyToken = async (userId, email, token) => {
  const tokenVerified = await new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (decoded && decoded.email === email && decoded.userId === userId) {
        resolve();
      } else {
        reject(strings.errors.token.ERROR);
      }
    });
  });
  return tokenVerified;
};

module.exports = { verifyToken };

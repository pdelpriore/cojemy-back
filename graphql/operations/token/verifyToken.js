const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config/security/Security");
const { strings } = require("../../../strings/Strings");

const verifyToken = async (email, token) => {
  const tokenVerified = await new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (decoded && decoded.email === email) {
        resolve();
      } else {
        reject(strings.errors.token.ERROR);
      }
    });
  });
  return tokenVerified;
};

module.exports = { verifyToken };

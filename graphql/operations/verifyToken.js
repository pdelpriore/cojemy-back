const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/security/Security");

const verifyToken = async (email, token) => {
  const tokenVerified = await new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        throw new Error(err);
      } else if (decoded && decoded.email === email) {
        resolve();
      }
    });
  });
  return tokenVerified;
};

module.exports = { verifyToken };

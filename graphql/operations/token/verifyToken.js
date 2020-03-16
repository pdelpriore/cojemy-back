const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config/security/Security");

const verifyToken = async (email, token) => {
  const tokenVerified = await new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (decoded && decoded.email === email) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
  return tokenVerified;
};

module.exports = { verifyToken };

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/security/Security");

const verifyToken = async token => {
  const tokenVerified = await new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        throw new Error(err);
      } else if (decoded) {
        resolve();
      }
    });
  });
  return tokenVerified;
};

module.exports = { verifyToken };

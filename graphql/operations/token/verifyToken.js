const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config/security/Security");
const { IdClient } = require("../../../config/security/Security");
const verifier = require("google-id-token-verifier");

const verifyToken = async (email, token, isUserGoogle) => {
  const tokenVerified = await new Promise((resolve, reject) => {
    if (!isUserGoogle) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (decoded && decoded.email === email) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } else {
      verifier.verify(token, IdClient, (err, tokenInfo) => {
        if (err) {
          resolve(false);
        } else if (tokenInfo.email_verified) {
          resolve(true);
        }
      });
    }
  });
  return tokenVerified;
};

module.exports = { verifyToken };

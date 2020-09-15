const verifier = require("google-id-token-verifier");
const { strings } = require("../../../strings/Strings");
require("dotenv").config();

const verifyGoogleIdToken = (email, token) => {
  return new Promise((resolve, reject) => {
    verifier.verify(token, process.env.ID_CLIENT, (err, tokenInfo) => {
      if (err || tokenInfo.email !== email) {
        reject(strings.errors.token.ERROR);
      } else if (tokenInfo.email_verified && tokenInfo.email === email) {
        resolve();
      }
    });
  });
};

module.exports = { verifyGoogleIdToken };

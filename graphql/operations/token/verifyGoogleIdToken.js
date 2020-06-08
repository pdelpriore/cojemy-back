const { IdClient } = require("../../../config/security/Security");
const verifier = require("google-id-token-verifier");
const { strings } = require("../../../strings/Strings");

const verifyGoogleIdToken = async (token) => {
  const IdTokenVerified = await new Promise((resolve, reject) => {
    verifier.verify(token, IdClient, (err, tokenInfo) => {
      if (err) {
        reject(strings.errors.token.ERROR);
      } else if (tokenInfo.email_verified) {
        resolve();
      }
    });
  });
  return IdTokenVerified;
};

module.exports = { verifyGoogleIdToken };

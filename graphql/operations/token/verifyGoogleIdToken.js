const { IdClient } = require("../../../config/security/Security");
const verifier = require("google-id-token-verifier");

const verifyGoogleIdToken = async (token) => {
  const IdTokenVerified = await new Promise((resolve, reject) => {
    verifier.verify(token, IdClient, (err, tokenInfo) => {
      if (err) {
        resolve(false);
      } else if (tokenInfo.email_verified) {
        resolve(true);
      }
    });
  });
  return IdTokenVerified;
};

module.exports = { verifyGoogleIdToken };

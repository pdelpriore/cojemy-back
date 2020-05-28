const { isUserExist } = require("../../operations/verification/isUserExist");
const { strings } = require("../../../strings/Strings");
const {
  verifyGoogleIdToken,
} = require("../../operations/token/verifyGoogleIdToken");
const { generateToken } = require("../../operations/token/generateToken");

module.exports = {
  loginGoogleUser: async ({ email }, { req, res }) => {
    try {
      const user = await isUserExist(email);
      if (user.isGoogleUser) {
        const googleIdTokenVerified = await verifyGoogleIdToken(
          req.get(strings.request.HEADER)
        );
        if (googleIdTokenVerified) {
          const token = await generateToken(user.email);
          res.cookie("id", token, {
            httpOnly: true,
            //on production set secure true
            //secure: true
          });
          return user;
        } else {
          throw new Error(strings.errors.token.ERROR);
        }
      } else {
        throw new Error(strings.errors.loginGoogleUser.ERROR);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};

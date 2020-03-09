const { isUserExist } = require("../../operations/verification/isUserExist");
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");
const { verifyToken } = require("../../operations/token/verifyToken");

module.exports = {
  loginGoogleUser: async ({ email }, { req, res }) => {
    try {
      const user = await isUserExist(email);
      if (user.isGoogleUser) {
        const tokenVerified = await verifyToken(
          email,
          req.get(strings.request.HEADER),
          user.isGoogleUser
        );
        if (tokenVerified) {
          res.cookie("id", req.get(strings.request.HEADER), {
            httpOnly: true
            //on production set secure true
            //secure: true
          });
          return user;
        } else {
          throw new Error(capitalizeFirst(strings.errors.token.ERROR));
        }
      } else {
        throw new Error(capitalizeFirst(strings.errors.loginGoogleUser.ERROR));
      }
    } catch (err) {
      if (err) throw err;
    }
  }
};

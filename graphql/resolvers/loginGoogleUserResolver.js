const { isUserExist } = require("../operations/verification/isUserExist");
const { isGoogleUser } = require("../operations/verification/isGoogleUser");
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");

module.exports = {
  loginGoogleUser: async ({ email }, { req, res }) => {
    try {
      const user = await isUserExist(email);
      const isUserGoogle = isGoogleUser(user.isGoogleUser);
      if (isUserGoogle) {
        res.cookie("id", req.get(strings.request.HEADER), {
          httpOnly: true
          //on production set secure true
          //secure: true
        });
      } else {
        throw new Error(capitalizeFirst(strings.errors.loginGoogleUser.ERROR));
      }
    } catch (err) {
      if (err) throw err;
    }
  }
};

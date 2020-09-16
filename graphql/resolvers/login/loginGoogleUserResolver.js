const { isUserExist } = require("../../operations/verification/isUserExist");
const { strings } = require("../../../strings/Strings");
const {
  verifyGoogleIdToken,
} = require("../../operations/token/verifyGoogleIdToken");
const { generateToken } = require("../../operations/token/generateToken");
const { hideUserPassword } = require("../../../shared/hideUserPassword");

module.exports = {
  loginGoogleUser: async ({ email }, { req, res }) => {
    try {
      await verifyGoogleIdToken(email, req.get(strings.request.HEADER));
      const user = await isUserExist(email);
      if (user.isGoogleUser) {
        const token = await generateToken(user.email);
        res.cookie("id", token, {
          httpOnly: true,
          //secure: true, set this option if https
        });

        return hideUserPassword(user);
      } else {
        throw new Error(strings.errors.loginGoogleUser.ERROR);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};

const { isUserExist } = require("../../operations/verification/isUserExist");
const {
  isPasswordCorrect,
} = require("../../operations/verification/isPasswordCorrect");
const { generateToken } = require("../../operations/token/generateToken");
const {
  protectAgainstHack,
} = require("../../operations/hack/protectAgainstHack");
const { strings } = require("../../../strings/Strings");
const { hideUserPassword } = require("../../../shared/hideUserPassword");

module.exports = {
  login: async ({ email, password }, { req, res }) => {
    try {
      await protectAgainstHack(req);
      const user = await isUserExist(email);
      if (!user.isGoogleUser) {
        if (user.isEmailConfirmed) {
          await isPasswordCorrect(password, user.password);
          const token = await generateToken(user.email);
          res.cookie("id", token, {
            httpOnly: true,
            //on production set secure true
            //secure: true
          });

          return hideUserPassword(user);
        } else {
          throw new Error(strings.errors.login.EMAIL_UNCONFIRMED);
        }
      } else {
        throw new Error(strings.errors.login.ERROR);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};

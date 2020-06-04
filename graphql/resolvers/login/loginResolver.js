const { isUserExist } = require("../../operations/verification/isUserExist");
const {
  isPasswordCorrect,
} = require("../../operations/verification/isPasswordCorrect");
const {
  isEmailConfirmed,
} = require("../../operations/verification/isEmailConfirmed");
const { generateToken } = require("../../operations/token/generateToken");
const {
  protectAgainstHack,
} = require("../../operations/hack/protectAgainstHack");
const { strings } = require("../../../strings/Strings");

module.exports = {
  login: async ({ email, password }, { req, res }) => {
    try {
      await protectAgainstHack(req);
      const user = await isUserExist(email);
      if (!user.isGoogleUser) {
        await isEmailConfirmed(user.isEmailConfirmed);
        await isPasswordCorrect(password, user.password);
        const token = await generateToken(user.email);
        res.cookie("id", token, {
          httpOnly: true,
          //on production set secure true
          //secure: true
        });
        const userWithoutPassword = (({ password, ...others }) => ({
          ...others,
        }))(user._doc);
        return userWithoutPassword;
      } else {
        throw new Error(strings.errors.login.ERROR);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};

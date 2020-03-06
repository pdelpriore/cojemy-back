const { isUserExist } = require("../operations/verification/isUserExist");
const {
  isPasswordCorrect
} = require("../operations/verification/isPasswordCorrect");
const {
  isEmailConfirmed
} = require("../operations/verification/isEmailConfirmed");
const { isGoogleUser } = require("../operations/verification/isGoogleUser");
const { generateToken } = require("../operations/token/generateToken");
const { capitalizeFirst } = require("../../util/Util");
const { strings } = require("../../strings/Strings");

module.exports = {
  login: async ({ email, password }, { res }) => {
    try {
      const user = await isUserExist(email);
      const isUserGoogle = await isGoogleUser(user.isGoogleUser);
      if (!isUserGoogle) {
        await isEmailConfirmed(user.isEmailConfirmed);
        await isPasswordCorrect(password, user.password);
        const token = await generateToken(user.email);
        res.cookie("id", token, {
          httpOnly: true
          //on production set secure true
          //secure: true
        });
      } else {
        throw new Error(capitalizeFirst(strings.errors.login.ERROR));
      }
      return user;
    } catch (err) {
      if (err) throw err;
    }
  }
};

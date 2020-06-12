const { verifyToken } = require("../../operations/token/verifyToken");
const { strings } = require("../../../strings/Strings");

module.exports = {
  logout: async ({ userId, email }, { req, res }) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );

      res.clearCookie("id");
      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};

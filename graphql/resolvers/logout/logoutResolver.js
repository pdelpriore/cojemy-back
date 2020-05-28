const { verifyToken } = require("../../operations/token/verifyToken");
const { strings } = require("../../../strings/Strings");

module.exports = {
  logout: async ({ email }, { req, res }) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        res.clearCookie("id");
        return true;
      } else {
        throw new Error(strings.errors.token.ERROR);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};

const { verifyToken } = require("../../operations/token/verifyToken");
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

module.exports = {
  logout: async ({ email }, { req, res }) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        res.clearCookie("id");
        return true;
      } else {
        throw new Error(capitalizeFirst(strings.errors.token.ERROR));
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};

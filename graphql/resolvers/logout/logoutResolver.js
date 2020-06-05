const { verifyToken } = require("../../operations/token/verifyToken");

module.exports = {
  logout: async ({ email }, { req, res }) => {
    try {
      await verifyToken(email, req.cookies.id);

      res.clearCookie("id");
      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};

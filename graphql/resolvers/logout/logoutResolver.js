const { verifyToken } = require("../../operations/token/verifyToken");

module.exports = {
  logout: async ({ userId, email }, { req, res }) => {
    try {
      await verifyToken(userId, email, req.cookies.id);

      res.clearCookie("id");
      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};

const { verifyToken } = require("../../operations/token/verifyToken");

module.exports = {
  logoutGoogleUser: async ({ email }, { req, res }) => {
    const tokenVerified = await verifyToken(email, req.cookies.id);
    if (tokenVerified) res.clearCookie("id");
    return true;
  }
};

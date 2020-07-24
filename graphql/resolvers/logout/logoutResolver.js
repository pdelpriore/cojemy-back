const { strings } = require("../../../strings/Strings");

module.exports = {
  logout: async ({ res }) => {
    res.clearCookie("id");
    return true;
  },
};

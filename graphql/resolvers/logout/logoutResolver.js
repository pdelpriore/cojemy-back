module.exports = {
  logout: async ({}, { req, res }) => {
    res.clearCookie("id");
    return true;
  },
};

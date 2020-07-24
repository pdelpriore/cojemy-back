const { verifyToken } = require("../../../shared/verifyToken");
const { strings } = require("../../../strings/Strings");

const userAuthGraphQL = async (req, res, next) => {
  try {
    if (req.path === strings.path.GRAPHQL) {
      await verifyToken(
        req.body.variables.userId,
        req.body.variables.email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      next();
    }
  } catch (err) {
    if (err) console.log(err);
  }
};

module.exports = { userAuthGraphQL };

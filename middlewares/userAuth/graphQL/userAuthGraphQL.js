const { verifyToken } = require("../../../shared/verifyToken");
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

const userAuthGraphQL = async (req, res, next) => {
  try {
    if (req.path === strings.path.GRAPHQL) {
      if (
        req.headers.referer !== strings.path.REFERER_LOGIN &&
        req.headers.referer !== strings.path.REFERER_SIGNUP
      ) {
        await verifyToken(
          req.body.variables.userId,
          req.body.variables.email,
          req.cookies.id,
          strings.tokenVerification.USER_AUTH
        );
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (err) {
    if (err) res.status(401).send(capitalizeFirst(strings.errors.token.ERROR));
  }
};

module.exports = { userAuthGraphQL };

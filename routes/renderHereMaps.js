const { renderMap } = require("../util/renderMap");
const { verifyToken } = require("../shared/verifyToken");
const { strings } = require("../strings/Strings");
const { capitalizeFirst } = require("../util/Util");
require("dotenv").config();

module.exports = (app) => {
  app.get(strings.path.MAP_RENDER, async (req, res) => {
    try {
      await verifyToken(
        req.params.userId,
        req.params.email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      res
        .status(200)
        .send(
          renderMap(
            req.params.latitude,
            req.params.longitude,
            req.params.zoom,
            process.env.HERE_API_KEY
          )
        );
    } catch (err) {
      if (err)
        res.status(401).send(capitalizeFirst(strings.errors.token.ERROR));
    }
  });
};

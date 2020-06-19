const { strings } = require("../strings/Strings");
const { hereAPIKey } = require("../config/security/Security");
const { renderMap } = require("../util/renderMap");

module.exports = (app) => {
  app.get(strings.path.MAP_RENDER, (req, res) => {
    res
      .status(200)
      .send(
        renderMap(
          req.params.latitude,
          req.params.longitude,
          req.params.zoom,
          hereAPIKey
        )
      );
  });
};

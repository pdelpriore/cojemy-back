const { strings } = require("../strings/Strings");
const { hereAPIKey } = require("../config/security/Security");
const fetch = require("node-fetch");

module.exports = (app) => {
  app.post(strings.path.HERE_MAP_REQUEST, async (req, res) => {
    try {
      const { addressValue } = req.body;
      const response = await fetch(
        `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${addressValue}&apiKey=${hereAPIKey}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        res.status(200).send(responseData);
      }
    } catch (err) {
      if (err) throw err;
    }
  });
};

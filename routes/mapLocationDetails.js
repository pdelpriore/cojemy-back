const { strings } = require("../strings/Strings");
const { hereAPIKey } = require("../config/security/Security");
const fetch = require("node-fetch");

module.exports = (app) => {
  app.post(strings.path.MAP_LOCATION_DETAILS, async (req, res) => {
    try {
      const { locationId } = req.body;
      const response = await fetch(
        `https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=${locationId}&jsonattributes=1&gen=9&apiKey=${hereAPIKey}`,
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

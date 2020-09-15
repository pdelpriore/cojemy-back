const { strings } = require("../strings/Strings");
const fetch = require("node-fetch");
require("dotenv").config();

module.exports = (app) => {
  app.post(strings.path.MAP_LOCATION_DETAILS, async (req, res) => {
    try {
      const { locationId } = req.body;
      const response = await fetch(
        `https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=${locationId}&jsonattributes=1&gen=9&apiKey=${process.env.HERE_API_KEY}`,
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

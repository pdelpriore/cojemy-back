const { strings } = require("../strings/Strings");
const fetch = require("node-fetch");
require("dotenv").config();

module.exports = (app) => {
  app.post(strings.path.HERE_MAP_REQUEST, async (req, res) => {
    try {
      const { addressValue } = req.body;
      const response = await fetch(
        encodeURI(
          `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${addressValue}&apiKey=${process.env.HERE_API_KEY}`
        ),
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

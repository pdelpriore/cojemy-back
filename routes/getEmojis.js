const { strings } = require("../strings/Strings");
const fetch = require("node-fetch");
require("dotenv").config();

module.exports = (app) => {
  app.post(strings.path.GET_EMOJIS, async (req, res) => {
    try {
      const response = await fetch(
        `https://emoji-api.com/emojis?access_key=${process.env.EMOJI_API_KEY}`,
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

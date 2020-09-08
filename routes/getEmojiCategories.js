const { strings } = require("../strings/Strings");
const { emojiAPIKey } = require("../config/security/Security");
const fetch = require("node-fetch");

module.exports = (app) => {
  app.post(strings.path.EMOJI_CATEGORIES, async (req, res) => {
    try {
      const response = await fetch(
        `https://emoji-api.com/categories?access_key=${emojiAPIKey}`,
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

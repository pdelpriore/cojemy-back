const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");

const dbConnection = async () => {
  try {
    const dbConnected = await mongoose.connect(strings.path.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (dbConnected) console.log(capitalizeFirst(strings.notification.DB));
  } catch (err) {
    if (err) throw new Error(err);
  }
};

module.exports = { dbConnection };

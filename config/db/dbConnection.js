const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");
require("dotenv").config();

const dbConnection = async () => {
  try {
    const dbConnected = await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.1wzsq.mongodb.net/<dbname>?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    if (dbConnected) console.log(capitalizeFirst(strings.notification.DB));
  } catch (err) {
    if (err) throw new Error(err);
  }
};

module.exports = { dbConnection };

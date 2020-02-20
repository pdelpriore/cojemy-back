const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");

const connection = mongoose
  .connect(strings.path.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(capitalizeFirst(strings.notification.DB)))
  .catch(err => {
    console.log(err);
    process.exit();
  });

module.exports = { connection };

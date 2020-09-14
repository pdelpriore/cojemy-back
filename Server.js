const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./graphql/schema/graphqlSchema");
const rootResolver = require("./graphql/resolvers/index");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const schedule = require("node-schedule");
const { dbConnection } = require("./config/db/dbConnection");
const ioConnection = require("./socketIo/connection/ioConnection");
const {
  userAuthGraphQL,
} = require("./middlewares/userAuth/graphQL/userAuthGraphQL");
const {
  userAuthSocketIO,
} = require("./middlewares/userAuth/socketIO/userAuthSocketIO");
const emailConfirmation = require("./routes/emailConfirmation");
const autocompleteHereMaps = require("./routes/autocompleteHereMaps");
const mapLocationDetails = require("./routes/mapLocationDetails");
const renderHereMap = require("./routes/renderHereMaps");
const getEmojis = require("./routes/getEmojis");
const getEmojiCategories = require("./routes/getEmojiCategories");
const generateGoogleAuthUrl = require("./helpers/generateGoogleAuthUrl");
const checkRequest = require("./util/checkRequest");
const { removeUnconfirmedUsers } = require("./util/removeUnconfirmedUsers");
const { removeOldMessages } = require("./util/removeOldMessages");
const { strings } = require("./strings/Strings");
const { capitalizeFirst } = require("./util/Util");

app.use(
  cors({
    credentials: true,
    origin: strings.path.ORIGIN_FRONT,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "250kb" }));
app.use(bodyParser.urlencoded({ limit: "250kb", extended: true }));

app.use(express.static(path.join(__dirname, "uploads")));

app.use(userAuthGraphQL);
app.use(
  strings.path.GRAPHQL,
  graphqlHTTP((req, res) => ({
    schema: graphqlSchema,
    rootValue: rootResolver,
    graphiql: true,
    context: { req, res },
    customFormatErrorFn: (err) => {
      if (err.message.includes("Unexpected error value")) {
        return {
          message: capitalizeFirst(
            err.message
              .replace(/['"]+/g, "")
              .split(":")
              .slice(1)
              .toString()
              .trim()
          ),
        };
      } else {
        return { message: capitalizeFirst(err.message) };
      }
    },
  }))
);

(async () => {
  try {
    await dbConnection();

    emailConfirmation(app);
    autocompleteHereMaps(app);
    mapLocationDetails(app);
    renderHereMap(app);
    getEmojis(app);
    getEmojiCategories(app);

    io.use(userAuthSocketIO);
    ioConnection(io);

    server.listen(strings.port, () => {
      console.log(capitalizeFirst(strings.notification.SERVER));
      //generateGoogleAuthUrl();
    });
  } catch (err) {
    if (err) console.log(err);
  }
})();

schedule.scheduleJob("*/10 * * * * *", () => {
  checkRequest();
});
schedule.scheduleJob("0 11 * * *", async () => {
  try {
    await removeUnconfirmedUsers();
    await removeOldMessages();
  } catch (err) {
    if (err) console.log(err);
  }
});

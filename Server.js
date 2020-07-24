const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { dbConnection } = require("./config/db/dbConnection");
const { setGraphQL } = require("./middlewares/setGraphQL/setGraphQL");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const schedule = require("node-schedule");
const { strings } = require("./strings/Strings");
const { capitalizeFirst } = require("./util/Util");
const emailConfirmation = require("./routes/emailConfirmation");
const autocompleteHereMaps = require("./routes/autocompleteHereMaps");
const mapLocationDetails = require("./routes/mapLocationDetails");
const renderHereMap = require("./routes/renderHereMaps");
const generateGoogleAuthUrl = require("./helpers/generateGoogleAuthUrl");
const checkRequest = require("./util/checkRequest");
const { removeUnconfirmedUsers } = require("./util/removeUnconfirmedUsers");
const ioConnection = require("./socketIo/connection/ioConnection");
const {
  userAuthGraphQL,
} = require("./middlewares/userAuth/graphQL/userAuthGraphQL");
const {
  userAuthSocketIO,
} = require("./middlewares/userAuth/socketIO/userAuthSocketIO");

app.use(
  cors({
    credentials: true,
    origin: strings.path.ORIGIN_FRONT,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "200kb" }));
app.use(bodyParser.urlencoded({ limit: "200kb", extended: true }));

app.use(express.static(path.join(__dirname, "uploads")));

app.use(userAuthGraphQL);
app.use(setGraphQL());

(async () => {
  try {
    await dbConnection();

    emailConfirmation(app);
    autocompleteHereMaps(app);
    mapLocationDetails(app);
    renderHereMap(app);

    io.use(userAuthSocketIO);
    ioConnection(io);

    server.listen(strings.port, () => {
      console.log(capitalizeFirst(strings.notification.SERVER));
      //generateGoogleAuthUrl();
    });
  } catch (err) {
    if (err) throw err;
  }
})();

schedule.scheduleJob("*/10 * * * * *", () => {
  checkRequest();
});
schedule.scheduleJob("0 11 * * *", async () => {
  try {
    await removeUnconfirmedUsers();
  } catch (err) {
    if (err) throw err;
  }
});

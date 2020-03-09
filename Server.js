const express = require("express");
const app = express();
const { dbConnection } = require("./config/db/dbConnection");
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./graphql/schema/graphqlSchema");
const rootResolver = require("./graphql/resolvers/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { strings } = require("./strings/Strings");
const { capitalizeFirst } = require("./util/Util");
const emailConfirmation = require("./routes/emailConfirmation");
const generateGoogleAuthUrl = require("./helpers/generateGoogleAuthUrl");
const checkRequest = require("./util/checkRequest");

app.use(
  cors({
    credentials: true,
    origin: strings.path.ORIGIN_FRONT
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  strings.path.GRAPHQL,
  graphqlHTTP((req, res) => ({
    schema: graphqlSchema,
    rootValue: rootResolver,
    graphiql: true,
    context: { req, res }
  }))
);

(async () => {
  try {
    await dbConnection();
    emailConfirmation(app);
    app.listen(strings.port, () => {
      console.log(capitalizeFirst(strings.notification.SERVER));
      //generateGoogleAuthUrl();
      checkRequest();
    });
  } catch (err) {
    if (err) throw err;
  }
})();

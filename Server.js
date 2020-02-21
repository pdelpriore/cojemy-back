const express = require("express");
const app = express();
const { connection } = require("./config/db/Connection");
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./graphql/schema/graphqlSchema");
const rootResolver = require("./graphql/resolvers/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const { strings } = require("./strings/Strings");
const { capitalizeFirst } = require("./util/Util");

app.use(cors());
app.use(bodyParser.json());

app.use(
  strings.path.GRAPHQL,
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: rootResolver,
    graphiql: true
  })
);

connection.then(() => {
  app.listen(strings.port, () =>
    console.log(capitalizeFirst(strings.notification.SERVER))
  );
});

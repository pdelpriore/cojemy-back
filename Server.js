const express = require("express");
const app = express();
const { connection } = require("./config/db/Connection");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/schema/Schema");
const cors = require("cors");
const { strings } = require("./strings/Strings");
const { capitalizeFirst } = require("./util/Util");

app.use(cors());

app.use(
  strings.path.GRAPHQL,
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

connection.then(() => {
  app.listen(strings.port, () =>
    console.log(capitalizeFirst(strings.notification.SERVER))
  );
});

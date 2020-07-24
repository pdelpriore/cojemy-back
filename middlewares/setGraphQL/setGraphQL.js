const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("../../graphql/schema/graphqlSchema");
const rootResolver = require("../../graphql/resolvers/index");
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");

const setGraphQL = () => {
  return (
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
};

module.exports = { setGraphQL };

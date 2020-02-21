const { buildSchema } = require("graphql");

module.exports = buildSchema(
  `
    type User {
      name: String!
      email: String!
      password: String!
    }
    input UserInput {
      name: String!
      email: String!
      password: String!
    }
    type RootQuery {
        user(email: String!): User!
        users: [User!]!
    }
    type RootMutation {
        signUp(userInput: UserInput): User!
    }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `
);

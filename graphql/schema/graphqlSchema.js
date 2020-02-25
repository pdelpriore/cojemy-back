const { buildSchema } = require("graphql");

module.exports = buildSchema(
  `
    type User {
      name: String!
      email: String!
      password: String!
      isEmailConfirmed: Boolean!
    }
    type RootQuery {
        user(email: String!): User!
        users: [User!]!
    }
    type RootMutation {
        signUp(name: String!, email: String!, confirmEmail: String!, password: String!, isEmailConfirmed: Boolean): User!
    }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `
);

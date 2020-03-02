const { buildSchema } = require("graphql");

module.exports = buildSchema(
  `
    type User {
      name: String!
      email: String!
      password: String!
      isEmailConfirmed: Boolean!
      creationDate: String!
    }
    type RootQuery {
        user(email: String!): User!
        users: [User!]!
    }
    type RootMutation {
        signUp(name: String!, email: String!, confirmEmail: String!, password: String!, isEmailConfirmed: Boolean, creationDate: String): User!
        customerContact(subject: String!, email: String!, content: String!): String
        remindPassword(email: String!): String
    }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `
);

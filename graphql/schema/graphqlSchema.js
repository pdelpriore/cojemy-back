const { buildSchema } = require("graphql");

module.exports = buildSchema(
  `
    type User {
      name: String!
      email: String!
      password: String!
      googlePhoto: String!
      isEmailConfirmed: Boolean!
      isGoogleUser: Boolean!
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
        login(email: String!, password: String!): User!
        logout(email: String!): Boolean
        signUpGoogleUser(name: String!, email: String!, googlePhoto: String!): User!
    }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `
);

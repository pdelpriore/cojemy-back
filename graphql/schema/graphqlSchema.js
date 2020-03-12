const { buildSchema } = require("graphql");

module.exports = buildSchema(
  `
    type User {
      _id: ID!
      name: String!
      email: String!
      password: String!
      googlePhoto: String!
      isEmailConfirmed: Boolean!
      isGoogleUser: Boolean!
      creationDate: String!
      recipes: [Recipe]
    }
    type Recipe {
      _id: ID!
      title: String!
      picture: String 
      category: String!
      date: String!
      author: User!
    }
    type RootQuery {
        retrieveRecipes(category: String!): [Recipe!]!
    }
    type RootMutation {
        signUp(name: String!, email: String!, confirmEmail: String!, password: String!): User!
        customerContact(subject: String!, email: String!, content: String!): String
        remindPassword(email: String!): String
        login(email: String!, password: String!): User!
        logout(email: String!): Boolean
        signUpGoogleUser(name: String!, email: String!, googlePhoto: String!): User!
        loginGoogleUser(email: String!): User!
        logoutGoogleUser(email: String!): Boolean
    }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `
);

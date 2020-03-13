const { buildSchema } = require("graphql");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const { GraphQLUpload } = require("graphql-upload");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    googlePhoto: { type: new GraphQLNonNull(GraphQLString) },
    isEmailConfirmed: { type: new GraphQLNonNull(GraphQLBoolean) },
    isGoogleUser: { type: new GraphQLNonNull(GraphQLBoolean) },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
    recipes: { type: new GraphQLList(RecipeType) }
  })
});

const RecipeType = new GraphQLObjectType({
  name: "Recipe",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    // picture: { type: GraphQLUpload },
    category: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(UserType) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    retrieveRecipes: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(RecipeType))),
      args: { category: { type: new GraphQLNonNull(GraphQLString) } }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    signUp: {
      type: new GraphQLNonNull(UserType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        confirmEmail: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      }
    },
    customerContact: {
      type: GraphQLString,
      args: {
        subject: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) }
      }
    },
    remindPassword: {
      type: GraphQLString,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      }
    },
    login: {
      type: new GraphQLNonNull(UserType),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      }
    },
    logout: {
      type: GraphQLBoolean,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      }
    },
    signUpGoogleUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        googlePhoto: { type: new GraphQLNonNull(GraphQLString) }
      }
    },
    loginGoogleUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      }
    },
    logoutGoogleUser: {
      type: GraphQLBoolean,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

// module.exports = buildSchema(
//   `
//     type User {
//       _id: ID!
//       name: String!
//       email: String!
//       password: String!
//       googlePhoto: String!
//       isEmailConfirmed: Boolean!
//       isGoogleUser: Boolean!
//       creationDate: String!
//       recipes: [Recipe]
//     }
//     type Recipe {
//       _id: ID!
//       title: String!
//       picture: String
//       category: String!
//       date: String!
//       author: User!
//     }
//     type RootQuery {
//         retrieveRecipes(category: String!): [Recipe!]!
//     }
//     type RootMutation {
//         signUp(name: String!, email: String!, confirmEmail: String!, password: String!): User!
//         customerContact(subject: String!, email: String!, content: String!): String
//         remindPassword(email: String!): String
//         login(email: String!, password: String!): User!
//         logout(email: String!): Boolean
//         signUpGoogleUser(name: String!, email: String!, googlePhoto: String!): User!
//         loginGoogleUser(email: String!): User!
//         logoutGoogleUser(email: String!): Boolean
//     }
//       schema {
//         query: RootQuery
//         mutation: RootMutation
//       }
//     `
// );

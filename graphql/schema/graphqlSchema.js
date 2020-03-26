const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} = graphql;
const { GraphQLUpload } = require("graphql-upload");
const GraphQLDate = require("graphql-date");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    photo: { type: GraphQLUpload },
    googlePhoto: { type: new GraphQLNonNull(GraphQLString) },
    isEmailConfirmed: { type: new GraphQLNonNull(GraphQLBoolean) },
    isGoogleUser: { type: new GraphQLNonNull(GraphQLBoolean) },
    creationDate: { type: new GraphQLNonNull(GraphQLDate) },
    recipes: { type: new GraphQLList(RecipeType) }
  })
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    recipe: { type: RecipeType },
    content: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLDate) }
  })
});

const RateType = new GraphQLObjectType({
  name: "Rate",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    recipe: { type: RecipeType },
    value: { type: new GraphQLNonNull(GraphQLInt) }
  })
});

const CommentsType = new GraphQLObjectType({
  name: "Comments",
  fields: () => ({
    commentator: { type: UserType },
    comment: { type: CommentType },
    rate: { type: RateType }
  })
});

const RecipeType = new GraphQLObjectType({
  name: "Recipe",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    picture: { type: GraphQLUpload },
    category: { type: new GraphQLNonNull(GraphQLString) },
    cookTime: { type: new GraphQLNonNull(GraphQLInt) },
    ingredients: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString)))
    },
    description: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLDate) },
    author: { type: new GraphQLNonNull(UserType) },
    comments: {
      type: new GraphQLList(CommentsType)
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    retrieveRecipes: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(RecipeType))),
      args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      }
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
    },
    addRecipeRateComment: {
      type: new GraphQLNonNull(RecipeType),
      args: {
        recipeId: { type: new GraphQLNonNull(GraphQLID) },
        rateValue: { type: new GraphQLNonNull(GraphQLInt) },
        commentContent: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

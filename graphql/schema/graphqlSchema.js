const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = graphql;
const GraphQLDate = require("graphql-date");

const ProfileImageInputType = new GraphQLInputObjectType({
  name: "ProfileImage",
  fields: () => ({
    image: { type: new GraphQLNonNull(GraphQLString) },
    imageName: { type: GraphQLString },
  }),
});

const RecipeImageInputType = new GraphQLInputObjectType({
  name: "RecipeImage",
  fields: () => ({
    image: { type: new GraphQLNonNull(GraphQLString) },
    imageName: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    photo: { type: GraphQLString },
    isEmailConfirmed: { type: new GraphQLNonNull(GraphQLBoolean) },
    isGoogleUser: { type: new GraphQLNonNull(GraphQLBoolean) },
    creationDate: { type: new GraphQLNonNull(GraphQLDate) },
    recipes: { type: new GraphQLList(RecipeType) },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    recipe: { type: RecipeType },
    content: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLDate) },
  }),
});

const RateType = new GraphQLObjectType({
  name: "Rate",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    recipe: { type: RecipeType },
    value: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

const CommentsType = new GraphQLObjectType({
  name: "Comments",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    commentator: { type: UserType },
    comment: { type: CommentType },
    rate: { type: RateType },
  }),
});

const RecipeType = new GraphQLObjectType({
  name: "Recipe",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    picture: { type: GraphQLString },
    video: { type: GraphQLString },
    category: { type: new GraphQLNonNull(GraphQLString) },
    cookTime: { type: new GraphQLNonNull(GraphQLInt) },
    ingredients: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
    },
    description: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLDate) },
    author: { type: new GraphQLNonNull(UserType) },
    comments: {
      type: new GraphQLList(CommentsType),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    retrieveRecipes: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(RecipeType))),
      args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        skip: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: new GraphQLNonNull(GraphQLInt) },
      },
    },
    searchRecipe: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(RecipeType))),
      args: {
        recipeTitle: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    retrieveMyRecipes: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(RecipeType))),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
  },
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
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    customerContact: {
      type: GraphQLString,
      args: {
        subject: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    remindPassword: {
      type: GraphQLString,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    login: {
      type: new GraphQLNonNull(UserType),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    logout: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    signUpGoogleUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLString },
      },
    },
    loginGoogleUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    addRecipeRateComment: {
      type: new GraphQLNonNull(RecipeType),
      args: {
        recipeId: { type: new GraphQLNonNull(GraphQLID) },
        rateValue: { type: new GraphQLNonNull(GraphQLInt) },
        commentContent: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    editRecipeRateComment: {
      type: new GraphQLNonNull(RecipeType),
      args: {
        recipeId: { type: new GraphQLNonNull(GraphQLID) },
        rateId: { type: new GraphQLNonNull(GraphQLID) },
        rateValue: { type: new GraphQLNonNull(GraphQLInt) },
        commentId: { type: new GraphQLNonNull(GraphQLID) },
        commentContent: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    removeRecipeRateComment: {
      type: new GraphQLNonNull(RecipeType),
      args: {
        rateId: { type: new GraphQLNonNull(GraphQLID) },
        commentId: { type: new GraphQLNonNull(GraphQLID) },
        recipeId: { type: new GraphQLNonNull(GraphQLID) },
        commentItemId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    addMyRecipe: {
      type: GraphQLBoolean,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        recipeImage: { type: RecipeImageInputType },
        video: { type: GraphQLString },
        category: { type: new GraphQLNonNull(GraphQLString) },
        cookTime: { type: new GraphQLNonNull(GraphQLInt) },
        ingredients: {
          type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
        },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    editMyRecipe: {
      type: GraphQLBoolean,
      args: {
        recipeId: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        recipeImage: { type: RecipeImageInputType },
        video: { type: GraphQLString },
        category: { type: new GraphQLNonNull(GraphQLString) },
        cookTime: { type: new GraphQLNonNull(GraphQLInt) },
        ingredients: {
          type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
        },
        description: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    removeMyRecipe: {
      type: GraphQLBoolean,
      args: {
        recipeId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    updateUserProfile: {
      type: new GraphQLNonNull(UserType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        profileImage: { type: ProfileImageInputType },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    changeUserPassword: {
      type: GraphQLBoolean,
      args: {
        currentPass: { type: new GraphQLNonNull(GraphQLString) },
        newPass: { type: new GraphQLNonNull(GraphQLString) },
        confirmPass: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    removeAccount: {
      type: GraphQLBoolean,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

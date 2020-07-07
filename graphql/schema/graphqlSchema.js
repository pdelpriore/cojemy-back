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
  GraphQLFloat,
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

const EventImageInputType = new GraphQLInputObjectType({
  name: "EventImage",
  fields: () => ({
    image: { type: new GraphQLNonNull(GraphQLString) },
    imageName: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const EventAddressInputType = new GraphQLInputObjectType({
  name: "EventAddress",
  fields: () => ({
    label: { type: new GraphQLNonNull(GraphQLString) },
    streetNumber: { type: GraphQLInt },
    streetName: { type: GraphQLString },
    postCode: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: new GraphQLNonNull(GraphQLString) },
    latitude: { type: new GraphQLNonNull(GraphQLFloat) },
    longitude: { type: new GraphQLNonNull(GraphQLFloat) },
    zoom: { type: new GraphQLNonNull(GraphQLInt) },
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
    isPremium: { type: new GraphQLNonNull(GraphQLBoolean) },
    isTrialPeriod: { type: new GraphQLNonNull(GraphQLBoolean) },
    creationDate: { type: new GraphQLNonNull(GraphQLDate) },
    recipes: { type: new GraphQLList(RecipeType) },
    events: { type: new GraphQLList(EventType) },
    eventsJoined: { type: new GraphQLList(EventType) },
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

const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    event: { type: new GraphQLNonNull(EventType) },
    label: { type: new GraphQLNonNull(GraphQLString) },
    streetNumber: { type: new GraphQLNonNull(GraphQLInt) },
    streetName: { type: new GraphQLNonNull(GraphQLString) },
    postCode: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    latitude: { type: new GraphQLNonNull(GraphQLFloat) },
    longitude: { type: new GraphQLNonNull(GraphQLFloat) },
    zoom: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    eventImage: { type: GraphQLString },
    eventAddress: { type: new GraphQLNonNull(AddressType) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    availablePlaces: { type: new GraphQLNonNull(GraphQLInt) },
    author: { type: new GraphQLNonNull(UserType) },
    participants: { type: new GraphQLList(UserType) },
    eventDate: { type: new GraphQLNonNull(GraphQLDate) },
    tel: { type: new GraphQLNonNull(GraphQLInt) },
    creationDate: { type: new GraphQLNonNull(GraphQLDate) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    retrieveRecipes: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(RecipeType))),
      args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        skip: { type: new GraphQLNonNull(GraphQLInt) },
        limit: { type: new GraphQLNonNull(GraphQLInt) },
      },
    },
    searchRecipe: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(RecipeType))),
      args: {
        recipeTitle: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    retrieveMyRecipes: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(RecipeType))),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    retrieveEvents: {
      type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(EventType))),
      args: {
        category: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
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
        userId: { type: new GraphQLNonNull(GraphQLID) },
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
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    changeUserPassword: {
      type: GraphQLBoolean,
      args: {
        currentPass: { type: new GraphQLNonNull(GraphQLString) },
        newPass: { type: new GraphQLNonNull(GraphQLString) },
        confirmPass: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    removeAccount: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    addMyEvent: {
      type: GraphQLBoolean,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        eventImage: { type: EventImageInputType },
        addressObj: { type: new GraphQLNonNull(EventAddressInputType) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        availablePlaces: { type: new GraphQLNonNull(GraphQLInt) },
        eventDate: { type: new GraphQLNonNull(GraphQLDate) },
        tel: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    clearOldEvents: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

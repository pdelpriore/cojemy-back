const graphql = require("graphql");
const User = require("../../model/User");
const { hashPassword } = require("../operations/Operations");
const { capitalize } = require("../../util/Util");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findOne({ email: args.email });
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        let password = await hashPassword(args.password);
        let user = new User({
          name: capitalize(args.name),
          email: args.email,
          password: password
        });
        return user.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

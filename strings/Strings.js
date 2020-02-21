const strings = Object.freeze({
  path: {
    MONGODB: "mongodb://localhost:27017/graphql",
    GRAPHQL: "/graphql"
  },
  port: 4000,
  notification: {
    SERVER: "server is running",
    DB: "connected to MongoDB database"
  },
  errors: {
    signup: {
      USER_EXISTS: "utilisateur déjà inscrit"
    }
  }
});

module.exports = { strings };

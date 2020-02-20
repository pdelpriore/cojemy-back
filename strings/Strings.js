const strings = Object.freeze({
  path: {
    MONGODB: "mongodb://localhost:27017/graphql",
    GRAPHQL: "/graphql"
  },
  port: 4000,
  notification: {
    SERVER: "server is running",
    DB: "connected to MongoDB database"
  }
});

module.exports = { strings };

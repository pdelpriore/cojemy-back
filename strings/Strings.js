const strings = Object.freeze({
  path: {
    MONGODB: "mongodb://localhost:27017/quoimanger",
    GRAPHQL: "/graphql",
    EMAIL_CONFIRM: "/emailconfirm/:token/:email",
    REDIRECT_LOGIN: "http://localhost:3000/login",
    SERVICE_EMAIL: "paul.del.priore29@gmail.com"
  },
  port: 4000,
  notification: {
    SERVER: "server is running",
    DB: "connected to MongoDB database"
  },
  contact: {
    CUSTOMER_EMAIL_SENT: "Ton email a été bien envoyé. Merci."
  },
  errors: {
    signup: {
      USER_EXISTS: "utilisateur déjà inscrit"
    },
    validateSignupForm: {
      NAME_LENGTH: "ton nom d'utilisateur doit contenir au moins 5 caractères",
      NAME_SPACE: "ton nom d'utilisateur ne peut pas contenir des espaces",
      WRONG_EMAIL: "ton email n'est pas correct",
      EMAILS_MISMATCH: "emails saisis ne sont pas les mêmes",
      WRONG_PASSWORD:
        "ton mot de passe doit contenir au moins: \n 1. Une chiffre \n 2. Un caractère minuscule \n 3. Un caractère majuscule \n 4. Huit caractères"
    }
  }
});

module.exports = { strings };

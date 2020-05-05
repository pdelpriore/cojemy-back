const strings = Object.freeze({
  path: {
    MONGODB: "mongodb://localhost:27017/quoimanger",
    GRAPHQL: "/graphql",
    EMAIL_CONFIRM: "/emailconfirm/:token/:email",
    REDIRECT_LOGIN: "http://localhost:3000/login",
    SERVICE_EMAIL: "paul.del.priore29@gmail.com",
    ORIGIN_FRONT: "http://localhost:3000",
  },
  port: 4000,
  request: {
    HEADER: "x-auth",
  },
  notification: {
    SERVER: "server is running",
    DB: "connected to MongoDB database",
  },
  contact: {
    CUSTOMER_EMAIL_SENT: "Ton email a été bien envoyé. Merci.",
  },
  remindPass: {
    PASSWORD_SENT: "nouveau mot de passe envoyé.",
  },
  signupGoogleUser: {
    NO_PASSWORD: "password not required",
  },
  retrieveRecipes: {
    CAT_NEWS: "news",
  },
  errors: {
    signup: {
      USER_EMAIL_EXISTS: "email déjà pris.",
      USER_NAME_EXISTS: "nom d'utilisateur déjà existe.",
    },
    signupGoogleUser: {
      USER_EXISTS: "utilisateur déjà inscrit.",
    },
    login: {
      WRONG_PASSWORD: "mot de passe incorrect.",
      EMAIL_UNCONFIRMED: "email non confirmé.",
      ERROR: "c'est un compte google.",
      HACK: "tu es bloqué en raison de tentative de hack.",
    },
    loginGoogleUser: {
      ERROR: "ce n'est pas un compte google.",
    },
    token: {
      ERROR: "tu n'es pas autorisé",
    },
    remindPass: {
      USER_NULL: "utilisateur n'existe pas.",
    },
    validateSignupForm: {
      NAME_LENGTH: "ton nom d'utilisateur doit contenir au moins 5 caractères.",
      NAME_SPACE: "ton nom d'utilisateur ne peut pas contenir des espaces.",
      WRONG_EMAIL: "ton email n'est pas correct.",
      EMAILS_MISMATCH: "emails saisis ne sont pas les mêmes.",
      WRONG_PASSWORD:
        "ton mot de passe doit contenir au moins: \n 1. Une chiffre \n 2. Un caractère minuscule \n 3. Un caractère majuscule \n 4. Huit caractères",
    },
    validateMyRecipeForm: {
      TITLE_LENGTH: "title trop long",
      IMAGE_FORMAT: "format d'image incorrecte",
      IMAGE_SIZE: "image trop large",
      VIDEO_ERROR: "adresse de vidéo incorrecte",
      CATEGORY_ERROR: "catégorie non acceptée",
      COOK_TIME_ZERO: "temps de cuisson incorrect",
      COOK_TIME_ERROR: "temps de cuisson trop large",
      INGREDIENTS_ERROR: "ingredients contiennent un élément vide",
      IMAGE_UNACCEPTABLE: "image inappropriée",
      VIDEO_UNACCEPTABLE: "vidéo inappropriée",
      TITLE_UNACCEPTABLE: "titre inapproprié",
      DESCRIPTION_UNACCEPTABLE: "description inappropriée",
    },
    retrieveRecipes: {
      NO_RECIPES: "pas de recettes.",
    },
    addNewRecipe: {
      RECIPE_EXISTS: "recette déjà existe.",
    },
  },
});

module.exports = { strings };

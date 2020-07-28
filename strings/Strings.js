const strings = Object.freeze({
  path: {
    MONGODB: "mongodb://localhost:27017/quoimanger",
    GRAPHQL: "/graphql",
    EMAIL_CONFIRM: "/emailconfirm/:token/:email",
    HERE_MAP_REQUEST: "/heremaprequest",
    MAP_LOCATION_DETAILS: "/heremaplocation",
    MAP_RENDER: "/heremaprender/:latitude/:longitude/:zoom/:userId/:email",
    REDIRECT_LOGIN: "http://localhost:3000/login",
    REFERER_LOGIN: "http://localhost:3000/login",
    REFERER_SIGNUP: "http://localhost:3000/signup",
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
  retrieveEvents: {
    CAT_MY_EVENTS: "myEvents",
    CAT_ALL: "all",
    CAT_EVENTS_JOINED: "eventsJoined",
  },
  imageTypes: {
    RECIPE: "recipes",
    USER: "users",
    EVENT: "events",
  },
  tokenVerification: {
    EMAIL_CONFIRM: "emailConfirm",
    USER_AUTH: "userAuth",
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
      COOK_TIME_SIZE: "temps de cuisson doit contenir 3 chiffres.",
      INGREDIENTS_ERROR: "ingredients contiennent un élément vide",
      IMAGE_UNACCEPTABLE: "image inappropriée",
      VIDEO_UNACCEPTABLE: "vidéo inappropriée",
      TITLE_UNACCEPTABLE: "titre inapproprié",
      DESCRIPTION_UNACCEPTABLE: "description inappropriée",
    },
    validateChangePasswordForm: {
      USER_GOOGLE: "utlisateur google ne peut pas changer son mot de passe.",
    },
    validateRateCommentForm: {
      RATE_VALUE: "note ne peut pas être supérieure à 5.",
    },
    retrieveRecipes: {
      NO_RECIPES: "pas de recettes.",
    },
    retrieveEvents: {
      NO_EVENTS: "pas d'événements",
    },
    addNewRecipe: {
      RECIPE_EXISTS: "tu as déjà enregistré cette recette.",
    },
    validateEventForm: {
      NO_STREET: "adresse d'événement doit avoir un nom de la rue.",
      NO_STREET_NUMBER: "merci de préciser un numéro de la rue",
      NO_CITY: "adresse d'événement doit avoir une ville",
      AVAILABLE_PLACES_ZERO: "nombre de places incorrect",
      AVAILABLE_PLACES_ERROR:
        "nombre de places ne peut pas être supérieur à 500.",
      AVAILABLE_PLACES_SIZE: "nombre de places doit contenir 3 chiffres.",
      EVENT_DATE_ERROR: "date incorrecte.",
      TEL_SIZE: "numéro de téléphone dépasse 9 chiffres",
    },
    addNewEvent: {
      EVENT_RESERVED: "événement déjà réservé sous l'addresse saisie.",
    },
    mails: {
      NO_RECIPIENT: "pas de résultat",
    },
  },
});

module.exports = { strings };

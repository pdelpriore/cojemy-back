const strings = Object.freeze({
  path: {
    MONGODB: "mongodb://localhost:27017/quoimanger",
    GRAPHQL: "/graphql",
    EMAIL_CONFIRM: "/emailconfirm/:token/:email",
    HERE_MAP_REQUEST: "/heremaprequest",
    MAP_LOCATION_DETAILS: "/heremaplocation",
    MAP_RENDER: "/heremaprender/:latitude/:longitude/:zoom/:userId/:email",
    GET_EMOJIS: "/emojis",
    EMOJI_CATEGORIES: "/emojicategories",
    REDIRECT_LOGIN: "http://localhost:3000/logowanie",
    REFERER_LOGIN: "http://localhost:3000/logowanie",
    REFERER_SIGNUP: "http://localhost:3000/rejestracja",
    REFERER_CONTACT: "http://localhost:3000/",
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
    CUSTOMER_EMAIL_SENT: "Email wysłany. Dzięki.",
  },
  remindPass: {
    PASSWORD_SENT: "nowe hasło zostało wysłane",
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
      USER_EMAIL_EXISTS: "email zajęty",
      USER_NAME_EXISTS: "nazwa użytkownika zajęta",
    },
    signupGoogleUser: {
      USER_EXISTS: "użytkownik jest już zarejestrowany",
    },
    login: {
      WRONG_PASSWORD: "hasło nieprawidłowe",
      EMAIL_UNCONFIRMED: "nie potwierdził(a)eś swojego maila",
      ERROR: "to jest konto użytkownika Google",
      HACK: "zostałeś zablokowany",
    },
    loginGoogleUser: {
      ERROR: "to nie jest konto użytkownika Google",
    },
    token: {
      ERROR: "autoryzacja nie powiodła się",
    },
    remindPass: {
      USER_NULL: "użytkownik nie istnieje",
    },
    validateSignupForm: {
      NAME_LENGTH: "nazwa użytkownika musi zawierać min. 5 znaków",
      NAME_SPACE: "nazwa użytkownika nie może zawierać spacji",
      WRONG_EMAIL: "nieprawidłowy format adresu mailowego",
      EMAILS_MISMATCH: "wprowadzone adresy mailowe muszą być takie same",
      WRONG_PASSWORD: "hasło musi zawierać cyfry oraz małe i duże litery",
    },
    validateMyRecipeForm: {
      TITLE_LENGTH: "nazwa za długa",
      IMAGE_FORMAT: "nieprawidłowy format obrazka",
      IMAGE_SIZE: "za duży rozmiar obrazka",
      VIDEO_ERROR: "nieprawidłowy adres nagrania",
      CATEGORY_ERROR: "nieprawidłowa kategoria",
      COOK_TIME_ZERO: "nieprawidłowy czas gotowania",
      COOK_TIME_ERROR: "czas gotowania za długi",
      COOK_TIME_SIZE: "czas gotowania może zawierać max 3 cyfry",
      INGREDIENTS_ERROR: "składniki zawierają jeden pusty element",
      IMAGE_UNACCEPTABLE: "niewłaściwy obrazek",
      VIDEO_UNACCEPTABLE: "niewłaściwe nagranie",
      TITLE_UNACCEPTABLE: "niewłaściwa nazwa",
      DESCRIPTION_UNACCEPTABLE: "niewłaściwy opis",
    },
    validateChangePasswordForm: {
      USER_GOOGLE: "użytkownik Google nie może zmienić hasła",
    },
    validateRateCommentForm: {
      RATE_VALUE: "ocena nie może być większa od 5",
    },
    retrieveRecipes: {
      NO_RECIPES: "brak przepisów",
    },
    retrieveEvents: {
      NO_EVENTS: "brak wydarzeń",
    },
    addNewRecipe: {
      RECIPE_EXISTS: "już dodała(e)ś przepis o takiej nazwie",
    },
    validateEventForm: {
      NO_STREET: "podaj nazwe ulicy",
      NO_STREET_NUMBER: "podaj numer ulicy",
      NO_CITY: "podaj nazwe miejscowości",
      AVAILABLE_PLACES_ZERO: "nieprawidłowa ilość miejsc",
      AVAILABLE_PLACES_ERROR: "max ilość miejsc nie może przekraczać 500",
      AVAILABLE_PLACES_SIZE: "ilość miejsc może zawierać max 3 cyfry",
      EVENT_DATE_ERROR: "nieprawidłowa data",
      TEL_SIZE: "numer telefonu nie może zawierać więcej niż 9 cyfr",
    },
    addNewEvent: {
      EVENT_RESERVED: "w wybranym dniu jest już zarezerwowane inne wydarzenie",
    },
    mails: {
      NO_RECIPIENT: "odbiorca nie istnieje",
      NO_MESSAGES: "brak wiadomości",
    },
    joinEvent: {
      ALREADY_JOINED: "zapisałe(a)ś się już na te wydarzenie",
      FULL: "brak wolnych miejsc",
      AUTHOR: "jesteś organizatorem",
    },
  },
});

module.exports = { strings };

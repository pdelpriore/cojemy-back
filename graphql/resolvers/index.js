const signUpResolver = require("./signup/signUpResolver");
const customerContactResolver = require("./customerContact/CustomerContactResolver");
const remindPasswordResolver = require("./remindPassword/remindPasswordResolver");
const loginResolver = require("./login/loginResolver");
const logoutResolver = require("./logout/logoutResolver");
const signUpGoogleUserResolver = require("./signup/signUpGoogleUserResolver");
const loginGoogleUserResolver = require("./login/loginGoogleUserResolver");
const logoutGoogleUserResolver = require("./logout/logoutGoogleUserResolver");

const rootResolver = {
  ...signUpResolver,
  ...customerContactResolver,
  ...remindPasswordResolver,
  ...loginResolver,
  ...logoutResolver,
  ...signUpGoogleUserResolver,
  ...loginGoogleUserResolver,
  ...logoutGoogleUserResolver
};

module.exports = rootResolver;

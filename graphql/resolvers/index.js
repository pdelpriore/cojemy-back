const signUpResolver = require("./signUpResolver");
const customerContactResolver = require("./customerContactResolver");
const remindPasswordResolver = require("./remindPasswordResolver");
const loginResolver = require("./loginResolver");
const logoutResolver = require("./logoutResolver");
const signUpGoogleUserResolver = require("./signUpGoogleUserResolver");
const loginGoogleUserResolver = require("./loginGoogleUserResolver");

const rootResolver = {
  ...signUpResolver,
  ...customerContactResolver,
  ...remindPasswordResolver,
  ...loginResolver,
  ...logoutResolver,
  ...signUpGoogleUserResolver,
  ...loginGoogleUserResolver
};

module.exports = rootResolver;

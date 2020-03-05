const signUpResolver = require("./signUpResolver");
const customerContactResolver = require("./customerContactResolver");
const remindPasswordResolver = require("./remindPasswordResolver");
const loginResolver = require("./loginResolver");
const logoutResolver = require("./logoutResolver");
const signUpGoogleUserResolver = require("./signUpGoogleUserResolver");

const rootResolver = {
  ...signUpResolver,
  ...customerContactResolver,
  ...remindPasswordResolver,
  ...loginResolver,
  ...logoutResolver,
  ...signUpGoogleUserResolver
};

module.exports = rootResolver;

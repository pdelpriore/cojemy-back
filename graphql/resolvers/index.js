const signUpResolver = require("./signUpResolver");
const customerContactResolver = require("./customerContactResolver");
const remindPasswordResolver = require("./remindPasswordResolver");
const loginResolver = require("./loginResolver");
const logoutResolver = require("./logoutResolver");

const rootResolver = {
  ...signUpResolver,
  ...customerContactResolver,
  ...remindPasswordResolver,
  ...loginResolver,
  ...logoutResolver
};

module.exports = rootResolver;

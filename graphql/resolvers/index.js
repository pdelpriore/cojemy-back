const signUpResolver = require("./signUpResolver");
const customerContactResolver = require("./customerContactResolver");
const remindPasswordResolver = require("./remindPasswordResolver");
const loginResolver = require("./loginResolver");

const rootResolver = {
  ...signUpResolver,
  ...customerContactResolver,
  ...remindPasswordResolver,
  ...loginResolver
};

module.exports = rootResolver;

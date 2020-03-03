const signUpResolver = require("./signUpResolver");
const customerContactResolver = require("./customerContactResolver");
const remindPasswordResolver = require("./remindPasswordResolver");

const rootResolver = {
  ...signUpResolver,
  ...customerContactResolver,
  ...remindPasswordResolver
};

module.exports = rootResolver;

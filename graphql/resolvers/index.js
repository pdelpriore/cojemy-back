const signUpResolver = require("./signUpResolver");
const customerContactResolver = require("./CustomerContactResolver");
const remindPasswordResolver = require("./remindPasswordResolver");

const rootResolver = {
  ...signUpResolver,
  ...customerContactResolver,
  ...remindPasswordResolver
};

module.exports = rootResolver;

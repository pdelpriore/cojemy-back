const signUpResolver = require("./signUpResolver");
const customerContactResolver = require("./CustomerContactResolver");

const rootResolver = {
  ...signUpResolver,
  ...customerContactResolver
};

module.exports = rootResolver;

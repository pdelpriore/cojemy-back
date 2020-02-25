const signUpResolver = require("./signUpResolver");
const emailConfirmationResolver = require("./emailConfirmationResolver");

const rootResolver = {
  ...signUpResolver,
  ...emailConfirmationResolver
};

module.exports = rootResolver;

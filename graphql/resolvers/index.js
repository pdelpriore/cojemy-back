const signUpResolver = require("./signup/signUpResolver");
const customerContactResolver = require("./customerContact/CustomerContactResolver");
const remindPasswordResolver = require("./remindPassword/remindPasswordResolver");
const loginResolver = require("./login/loginResolver");
const logoutResolver = require("./logout/logoutResolver");
const signUpGoogleUserResolver = require("./signup/signUpGoogleUserResolver");
const loginGoogleUserResolver = require("./login/loginGoogleUserResolver");
const logoutGoogleUserResolver = require("./logout/logoutGoogleUserResolver");
const retrieveRecipesResolver = require("./recipe/retrieveRecipes/retriveRecipesResolver");
const addRecipeRateCommentResolver = require("./recipe/addRateComment/addRecipeRateCommentResolver");
const editRecipeRateCommentResolver = require("./recipe/editRateComment/editRecipeRateCommentResolver");
const removeRecipeRateComment = require("./recipe/removeRateComment/removeRecipeRateCommentResolver");

const rootResolver = {
  ...signUpResolver,
  ...customerContactResolver,
  ...remindPasswordResolver,
  ...loginResolver,
  ...logoutResolver,
  ...signUpGoogleUserResolver,
  ...loginGoogleUserResolver,
  ...logoutGoogleUserResolver,
  ...retrieveRecipesResolver,
  ...addRecipeRateCommentResolver,
  ...editRecipeRateCommentResolver,
  ...removeRecipeRateComment
};

module.exports = rootResolver;

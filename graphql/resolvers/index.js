const signUpResolver = require("./signup/signUpResolver");
const customerContactResolver = require("./customerContact/CustomerContactResolver");
const remindPasswordResolver = require("./remindPassword/remindPasswordResolver");
const loginResolver = require("./login/loginResolver");
const logoutResolver = require("./logout/logoutResolver");
const signUpGoogleUserResolver = require("./signup/signUpGoogleUserResolver");
const loginGoogleUserResolver = require("./login/loginGoogleUserResolver");
const retrieveRecipesResolver = require("./recipe/retrieveRecipes/retriveRecipesResolver");
const addRecipeRateCommentResolver = require("./recipe/addRateComment/addRecipeRateCommentResolver");
const editRecipeRateCommentResolver = require("./recipe/editRateComment/editRecipeRateCommentResolver");
const removeRecipeRateCommentResolver = require("./recipe/removeRateComment/removeRecipeRateCommentResolver");
const searchRecipeResolver = require("./recipe/searchRecipe/searchRecipeResolver");
const retrieveMyRecipesResolver = require("./recipe/retrieveMyRecipes/retrieveMyRecipesResolver");
const addMyRecipeResolver = require("./recipe/addMyRecipe/addMyRecipeResolver");
const editMyRecipeResolver = require("./recipe/editMyRecipe/editMyRecipeResolver");

const rootResolver = {
  ...signUpResolver,
  ...customerContactResolver,
  ...remindPasswordResolver,
  ...loginResolver,
  ...logoutResolver,
  ...signUpGoogleUserResolver,
  ...loginGoogleUserResolver,
  ...retrieveRecipesResolver,
  ...addRecipeRateCommentResolver,
  ...editRecipeRateCommentResolver,
  ...removeRecipeRateCommentResolver,
  ...searchRecipeResolver,
  ...retrieveMyRecipesResolver,
  ...addMyRecipeResolver,
  ...editMyRecipeResolver,
};

module.exports = rootResolver;

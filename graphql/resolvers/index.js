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
const removeMyRecipeResolver = require("./recipe/removeMyRecipe/removeMyRecipeResolver");
const updateUserProfileResolver = require("./updateUserProfile/profile/updateProfile");
const changeUserPasswordResolver = require("./updateUserProfile/changeUserPassword/changeUserPasswordResolver");
const removeAccountResolver = require("./updateUserProfile/removeAccount/removeAccountResolver");
const addMyEventResolver = require("./event/addMyEvent/addMyEventResolver");
const retrieveEventsResolver = require("./event/retrieveEvents/retrieveEventsResolver");
const editMyEventResolver = require("./event/editMyEvent/editMyEventResolver");
const removeMyEventResolver = require("./event/removeMyEvent/removeMyEventResolver");
const searchEventsResolver = require("./event/searchEvents/searchEventsResolver");
const joinEventResolver = require("./event/joinEvent/joinEventResolver");
const unjoinEventResolver = require("./event/unjoinEvent/unjoinEventResolver");
const followAuthorRecipeResolver = require("./recipe/followAuthor/followAuthorRecipeResolver");
const unfollowAuthorRecipeResolver = require("./recipe/unfollowAuthor/unfollowAuthorRecipeResolver");
const followAuthorEventResolver = require("./event/followAuthor/followAuthorEventResolver");
const unfollowAuthorEventResolver = require("./event/unfollowAuthor/unfollowAuthorEventResolver");

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
  ...removeMyRecipeResolver,
  ...updateUserProfileResolver,
  ...changeUserPasswordResolver,
  ...removeAccountResolver,
  ...addMyEventResolver,
  ...retrieveEventsResolver,
  ...editMyEventResolver,
  ...removeMyEventResolver,
  ...searchEventsResolver,
  ...joinEventResolver,
  ...unjoinEventResolver,
  ...followAuthorRecipeResolver,
  ...unfollowAuthorRecipeResolver,
  ...followAuthorEventResolver,
  ...unfollowAuthorEventResolver,
};

module.exports = rootResolver;

const hideUselessUserData = (userData) => {
  let result = [];
  userData.forEach((user) => {
    result.push(
      (({
        email,
        password,
        isEmailConfirmed,
        isGoogleUser,
        isPremium,
        isTrialPeriod,
        creationDate,
        recipes,
        events,
        eventsJoined,
        followers,
        ...others
      }) => ({
        ...others,
        isConnected: user.isConnected,
      }))(user._doc)
    );
  });
  return result;
};

module.exports = { hideUselessUserData };

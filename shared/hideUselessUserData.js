const hideUselessUserData = (userData) => {
  return userData.map((user) =>
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
      messages,
      ...others
    }) => ({
      ...others,
      isConnected: user.isConnected,
    }))(user._doc)
  );
};

module.exports = { hideUselessUserData };

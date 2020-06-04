const hideUserPassword = (user) => {
  return (({ password, ...others }) => ({
    ...others,
  }))(user._doc);
};

module.exports = { hideUserPassword };

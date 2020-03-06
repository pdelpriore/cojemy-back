const isGoogleUser = async isGoogleUser => {
  const result = await new Promise((resolve, reject) => {
    if (isGoogleUser) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
  return result;
};

module.exports = { isGoogleUser };

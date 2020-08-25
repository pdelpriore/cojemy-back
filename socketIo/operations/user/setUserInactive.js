const User = require("../../../model/User");

const setUserInactive = (userId) => {
  return new Promise(async (resolve) => {
    try {
      await User.findOneAndUpdate(
        { _id: userId },
        { $set: { isConnected: false } },
        { new: true }
      ).exec();
      resolve();
    } catch (err) {
      if (err) console.log(err);
    }
  });
};

module.exports = { setUserInactive };

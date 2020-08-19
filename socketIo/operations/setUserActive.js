const User = require("../../model/User");

const setUserActive = (userId) => {
  return new Promise(async (resolve) => {
    try {
      await User.findOneAndUpdate(
        { _id: userId },
        { $set: { isConnected: true } },
        { new: true }
      ).exec();
      resolve();
    } catch (err) {
      if (err) console.log(err);
    }
  });
};

module.exports = { setUserActive };

const User = require("../model/User");

const removeUnconfirmedUsers = () => {
  return new Promise(async (resolve) => {
    try {
      const unconfirmedUsers = await User.find({
        isEmailConfirmed: false,
        creationDate: { $lte: new Date().getTime() - 1000 * 3600 * 24 * 2 },
      });
      if (unconfirmedUsers.length > 0) {
        const unconfirmedUserIds = unconfirmedUsers.map(
          (unconfirmedUser) => unconfirmedUser._id
        );
        await User.deleteMany({ _id: { $in: unconfirmedUserIds } });
        resolve();
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { removeUnconfirmedUsers };

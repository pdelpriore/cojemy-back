const User = require("../../../model/User");
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

const searchRecipient = (senderId, searchedUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const recipients = await User.find({
        name: { $regex: `.*${searchedUser}.*`, $options: "i" },
      }).limit(5);

      if (recipients.length > 0) {
        resolve(
          recipients.filter(
            (recipient) => recipient._id.toString() !== senderId.toString()
          )
        );
      } else {
        reject(capitalizeFirst(strings.errors.mails.NO_RECIPIENT));
      }
    } catch (err) {
      if (err) console.log(err);
    }
  });
};

module.exports = { searchRecipient };

const Recipe = require("../../../../model/Recipe");
const Rate = require("../../../../model/Rate");
const Comment = require("../../../../model/Comment");
const User = require("../../../../model/User");
const Event = require("../../../../model/Event");
const Address = require("../../../../model/Address");
const Message = require("../../../../model/Message");
const Conversation = require("../../../../model/Conversation");
const { removeImage } = require("../../../operations/image/removeImage");
const { strings } = require("../../../../strings/Strings");
const { userGooglePhoto } = require("../../../../shared/testWords");

module.exports = {
  removeAccount: async ({ email }) => {
    try {
      const user = await User.findOne({ email: email });
      if (
        user.photo &&
        !userGooglePhoto.some(
          (element) => user.photo && user.photo.includes(element)
        )
      )
        removeImage(
          user.photo.split("/").slice(3).toString(),
          strings.imageTypes.USER
        );
      if (user.recipes.length > 0) {
        const recipes = await Recipe.find({ _id: { $in: user.recipes } });
        const recipesWithPicture = recipes.filter(
          (recipe) => recipe.picture !== null && recipe.picture !== undefined
        );
        recipesWithPicture.length > 0 &&
          recipesWithPicture.forEach((recipe) => {
            removeImage(
              recipe.picture.split("/").slice(3).toString(),
              strings.imageTypes.RECIPE
            );
          });
        await Recipe.deleteMany({ _id: { $in: user.recipes } });
      }

      const recipesCommentedAndRatedByUser = await Recipe.find({
        "comments.commentator": user._id,
      });
      if (recipesCommentedAndRatedByUser.length > 0) {
        const recipeIds = recipesCommentedAndRatedByUser.map(
          (recipe) => recipe._id
        );
        recipesCommentedAndRatedByUser.forEach(async (recipe) => {
          let commentIds = recipe.comments.map((item) => item._id);
          let recipeComments = recipe.comments.map((item) => item.comment);
          let recipeRates = recipe.comments.map((item) => item.rate);

          await Comment.deleteMany({ _id: { $in: recipeComments } });
          await Rate.deleteMany({ _id: { $in: recipeRates } });
          await Recipe.updateMany(
            { _id: { $in: recipeIds } },
            { $pull: { comments: { $in: commentIds } } }
          );
        });
      }

      if (user.events.length > 0) {
        const events = await Event.find({ _id: { $in: user.events } });
        const eventsWithPicture = events.filter(
          (event) => event.eventImage !== null && event.eventImage !== undefined
        );
        eventsWithPicture.length > 0 &&
          eventsWithPicture.forEach((event) => {
            removeImage(
              event.eventImage.split("/").slice(3).toString(),
              strings.imageTypes.EVENT
            );
          });

        const eventIds = events.map((event) => event._id);

        const eventAddressIds = events.map((event) => event.eventAddress);
        if (eventAddressIds.length > 0) {
          await Address.updateMany(
            { _id: { $in: eventAddressIds } },
            { $pull: { events: { $in: eventIds } } }
          );
          const addressesWithEventPulled = await Address.find({
            _id: { $in: eventAddressIds },
          });
          const addressesWithNoEvent = addressesWithEventPulled
            .filter((address) => address.events.length === 0)
            .map((addressNoEvent) => addressNoEvent._id);
          if (addressesWithNoEvent.length > 0) {
            await Address.deleteMany({ _id: { $in: addressesWithNoEvent } });
          }
        }

        events.forEach(async (event) => {
          let participantIds =
            event.participants.length > 0 &&
            event.participants.map((participant) => participant);
          participantIds.length > 0 &&
            (await User.updateMany(
              { _id: { $in: participantIds } },
              { $pull: { eventsJoined: { $in: eventIds } } }
            ));
        });
        await Event.deleteMany({ _id: { $in: eventIds } });
      }

      if (user.messages.length > 0) {
        const messages = await Message.find({ _id: { $in: user.messages } });
        if (messages.length > 0) {
          const messageIds = messages.map((message) => message._id);
          const recipientIds = messages.map((message) => message.recipient);
          const senderIds = messages.map((message) => message.sender);
          messages.forEach(async (message) => {
            let conversationIds = message.conversations.map(
              (conversation) => conversation
            );
            await Conversation.deleteMany({ _id: { $in: conversationIds } });
          });
          await User.updateMany(
            { _id: { $in: recipientIds } },
            { $pull: { messages: { $in: messageIds } } }
          );
          await User.updateMany(
            { _id: { $in: senderIds } },
            { $pull: { messages: { $in: messageIds } } }
          );
          await Message.deleteMany({ _id: { $in: messageIds } });
        }
      }
      await User.findOneAndRemove({ email: email });

      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};

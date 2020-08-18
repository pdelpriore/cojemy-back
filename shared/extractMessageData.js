const extractMessageData = (messages) => {
  return messages.map((message) => ({
    _id: message._doc._id,
    conversations: message._doc.conversations,
    recipient: {
      ...message.recipient._doc,
      isConnected: message.recipient.isConnected,
    },
    sender: { ...message.sender._doc, isConnected: message.sender.isConnected },
    isRecipientRead: message._doc.isRecipientRead,
    date: message._doc.date,
  }));
};

module.exports = { extractMessageData };

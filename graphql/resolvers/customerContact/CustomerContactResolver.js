const {
  validateCustomerContactForm,
} = require("../../operations/validation/validateCustomerContactForm");
const {
  sendCustomerContactEmail,
} = require("../../operations/email/sendCustomerContactEmail");
const { strings } = require("../../../strings/Strings");

module.exports = {
  customerContact: async ({ subject, email, content }) => {
    try {
      await validateCustomerContactForm(email);
      await sendCustomerContactEmail(subject, email, content);
      return strings.contact.CUSTOMER_EMAIL_SENT;
    } catch (err) {
      if (err) throw new Error(err);
    }
  },
};

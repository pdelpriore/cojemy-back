const {
  validateCustomerContactForm
} = require("../operations/validateCustomerContactForm");
const {
  sendCustomerContactEmail
} = require("../operations/sendCustomerContactEmail");
const { strings } = require("../../strings/Strings");

module.exports = {
  customerContact: async ({ subject, email, content }) => {
    await validateCustomerContactForm(email);
    await sendCustomerContactEmail(subject, email, content);
    return strings.contact.CUSTOMER_EMAIL_SENT;
  }
};

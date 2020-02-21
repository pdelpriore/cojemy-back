module.exports = {
  changeSomething: async (
    { userInput: { name, email, password } },
    { isAuth }
  ) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        throw new Error(capitalizeFirst(strings.errors.signup.USER_EXISTS));
      } else {
        let passwordHashed = await hashPassword(password);
        let user = new User({
          name: name,
          email: email,
          password: passwordHashed
        });
        return await user.save();
      }
    } catch (err) {
      if (err) throw err;
    }
  }
};

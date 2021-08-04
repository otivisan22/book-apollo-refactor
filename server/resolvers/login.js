const { User } = require("../models");
const { signToken } = require("../utils/auth");

const login = async (_, { input }) => {
  const { email, password } = input;
  const user = await User.findOne({ email: input.email });
  if (!user) {
    throw new AuthenticationError("User does not exist");
  }

  const isValidPassword = await user.CorrectPassword(password);

  if (!isValidPassword) {
    throw new AuthenticationError("Invalid Password");
  }

  const token = signToken({
    id: user._id,
    email: user.email,
    username: user.username,
  });

  return { token, user };
};

module.exports = login;

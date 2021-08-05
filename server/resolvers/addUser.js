const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const addUser = async (_, { input }) => {
  const { username, email, password } = input;

  const user = await User.findOne({ email });

  if (!user) {
    const newUser = await User.create({ username, email, password });

    if (!newUser) {
      throw newAuthenticationError("Something went wrong");
    }
    const token = signToken({
      email: newUser.email,
      id: newUser._id,
      username: newUser.username,
    });

    return { token, user: newUser };
  } else {
    throw newAuthenticationError("User already exist!");
  }
};

module.exports = addUser;

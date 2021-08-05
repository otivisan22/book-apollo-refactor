const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const saveBook = async (_, { input }, context) => {
  try {
    if (context.user) {
      const { bookId, authors, title, description, image } = input;
      const updateUser = await User.findOneAndUpdate(
        { _id: context.user.id },
        {
          $addToSet: {
            savedBooks: { bookId, authors, title, description, image },
          },
        },
        { new: true, runValidators: true }
      );
      return updateUser;
    } else {
      throw new AuthenticationError("Not authorized");
    }
  } catch (error) {
    console.log(error);
    throw new AuthenticationError("Something went wrong");
  }
};

module.exports = saveBook;

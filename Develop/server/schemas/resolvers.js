// create a new class to instantiate for a user
// set up the methods you will need to call for the authentication process
// use this to decode a token and get the user's information out of it

const { User } = require('../models');
const { AuthenticationError } = require('@apollo/server');
const { signToken } = require('../utils/auth');

// Set up the resolver functions for the data sources
// need to query the database to retrieve the data
// need to create a new user using the createUser mutation
// need to login a user using the login mutation
// need to save a book to a user's `savedBooks` field using the saveBook mutation
// need to remove a book from `savedBooks` using the removeBook mutation
// ================================================================

const resolvers = {

  // Queries a single user 
  // ================================================================

  Query: {
    me: async (parent, { _id }, context ) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

// mutation to create a new user
// ================================================================

  Mutation: {
    createUser: async (parent, args) => {
      try {
     const user = await User.create(args);
      const token = signToken(user);
  
      return { token, user };
    } catch (err) {
      throw new Error ("user failed to be created")
    
    }
  },

// mutation to login a user
// ================================================================
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthenticationError('Incorrect credentials');
    }
    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      throw new AuthenticationError('Incorrect credentials');
    }
    const token = signToken(user);
    return { token, user };
  },

// mutation to save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
// ================================================================
 
saveBook: async (parent, { bookData }, context) => {
  if (context.user) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: bookData } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } catch (err) {
      console.log(err);
      throw new AuthenticationError('Something went wrong! Book not saved!');
    }
  }
  throw new AuthenticationError('You need to be logged in!');
},

// Delete a book from `savedBooks`
// ================================================================
deleteBook: async (parent, { bookId }, context) => {
  if (context.user) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return updatedUser;
    }
    catch (err) {
      console.log(err);
      throw new AuthenticationError('Something went wrong! Book not deleted!');
    }
  }
  throw new AuthenticationError('You need to be logged in!');
}
},
};

module.exports = resolvers;

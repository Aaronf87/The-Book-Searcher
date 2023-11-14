// import the gql tagged template function
const typeDefs = `#graphql


# set typeDefs as the query type, which will be queried by the front end
# ================================================================

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    password: String!
    savedBooks: [Book]
  }
# query books id, authors, description, bookId, title, image, link
# ================================================================
  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }
# set up an Auth type to handle returning data from a login query
# ================================================================
  type Auth {
    token: ID!
    user: User
  }

# set up query type, which will be queried by the front end
  type Query {
    me: User
  }

  
# set up mutation type, which will be queried by the front end
# ================================================================
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    savedBooks(bookData: Book!): User
    removeBook(bookId: String!): User
  }
  `;
// export the typeDefs

module.exports = typeDefs;

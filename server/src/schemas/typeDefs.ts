const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks:[Book]
  }

  type Book {
    bookId: ID!
    authors: [String!]!
    description: String!
    title: String!
    image: String!
    link: String
    ratings: [Rating]! 
    averageRating: Float!
    totalRatings: Int!
  }

  type Auth {
    token: String!
    user: User
  }

    type Rating {
    rating: Int!    
    user: User!     
  }

  type BookRating {
    book: Book
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: ID!, authors: [String]!, description: String!, title: String!, image: String!, link: String): User
    removeBook(bookId: ID!): User
    averageRating: Float!, totalRatings: Int!
    rateBook(bookId: String!, rating: Int!): Book
  }


  input BookInput {
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String
    ratings: [Int]
    averageRating: Float!
    totalRatings: Int!
}
`;

export default typeDefs;
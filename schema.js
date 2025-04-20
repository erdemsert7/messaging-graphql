const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Message {
    id: ID!
    senderUsername: String!
    receiverUsername: String!
    content: String!
    timestamp: String!
  }

  type Query {
    getUserByUsername(username: String!): User
    getUserByEmail(email: String!): User
    getMessages(otherUsername: String!): [Message]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    sendMessage(receiverUsername: String!, content: String!): Message
  }
`;

module.exports = typeDefs;
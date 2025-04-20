const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
 await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: ({ req }) => {
      const token = req.headers.authorization?.replace('Bearer ', '') || '';
      return { token };
    },
  });
};

startServer();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// ApolloServer is used to setup the server and conifgure it and tell Apollo how handle queries. Standalone is used to start listing for requests

// server setup
// Apollo server takes object as argumnet with two properties
const server = new ApolloServer({
  // typeDefs
  // resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port ", 4000);

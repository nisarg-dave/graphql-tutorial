import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";

// ApolloServer is used to setup the server and conifgure it and tell Apollo how handle queries. Standalone is used to start listening for requests

// server setup
// Apollo server takes object as argumnet with two properties
const server = new ApolloServer({
  // typeDefs - defintions of types of data that we want to expose -> definition of the types, the queries we can make on them and relation to other types combine to form a Schema
  typeDefs,
  // resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port ", 4000);

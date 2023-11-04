import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

// ApolloServer is used to setup the server and conifgure it and tell Apollo how handle queries. Standalone is used to start listening for requests

// resolvers are functions that return the data
const resolvers = {
  // Resolver function for Query type
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
  },
};

// If use asks for only the title in the games array then Apollo will handle that and only return the titles and leave out rest of data

// server setup
// Apollo server takes object as argumnet with two properties
const server = new ApolloServer({
  // typeDefs - defintions of types of data that we want to expose -> definition of the types, the queries we can make on them and relation to other types combine to form a Schema
  typeDefs,
  // resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port ", 4000);

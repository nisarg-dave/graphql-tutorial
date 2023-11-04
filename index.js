import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

// ApolloServer is used to setup the server and conifgure it and tell Apollo how handle queries. Standalone is used to start listening for requests

// resolvers are functions that return the data
// If use asks for only the title in the games array then Apollo will handle that and only return the titles and leave out rest of data
const resolvers = {
  // Resolver function for Query type
  Query: {
    games() {
      return db.games;
    },
    game(parent, args, context) {
      return db.games.find((game) => game.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    // args object grabs the parameters used by user in this function
    review(parent, args, context) {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(parent, args, context) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
};

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

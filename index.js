import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

// ApolloServer is used to setup the server and conifgure it and tell Apollo how handle queries. Standalone is used to start listening for requests

// resolvers are functions that return the data
// If user asks for only the title in the games array then Apollo will handle that and only return the titles and leave out rest of data
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
  // To get back related data, can't use the Query type as it doesn't have an entry point for this. Create another key for the object other types
  // created resolver called reviews which has an argument called parent which has the return value of the resolver game(parent, args, context) from above and that Game object has an id which can be matched to the review/reviews it is associated with
  // Parent has access to previous resolver
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  // Query for something like above looks like this
  // query GamesQuery($id: ID!) {
  //   game(id: $id) {
  //     platform,
  //     title,
  //     reviews {
  //       rating
  //       content
  //     }
  //   }
  // }
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  // Query for something like above looks like this
  // query ReviewQuery($id: ID!) {
  //   review(id: $id) {
  //     rating,
  //     game {
  //       title
  //       platform
  //     },
  //     author {
  //       name,
  //       verified
  //     }
  //   }
  // }
  Mutation: {
    deleteGame(parent, args, context) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      // args.game already has the fields we have
      let game = {
        ...args.game,
        id: db.games.length + 1,
      };
      db.games.push(game);
      return game;
    },
    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }
        return game;
      });

      return db.games.find((game) => game.id === args.id);
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

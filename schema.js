export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]! 
        # this can be nullable but if it has data then it can't
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        # related fields
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games:  [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
        # Deleting game and then returning updated game array
        deleteGame(id:ID!) : [Game!]!
        # For adding we could add each parameter but better way to do it is using input types
        addGame(game: AddGameInput!): Game
    }
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
`;

// using a syntax highlighter hence #graphql
// int, float, string, boolean, ID - types available and are called Scalar types
// Review, Games and Author are called Object types
// [String] -> array of strings
// ! means required, [String]! -> means that needs to be an array but strings need to be nullable
// Therefore, need like this [String!]! -> means that String inside are required
// Query type is a special type in graphql that is required and specifies the entry points to the graph and the return types of those entry points
// If we did this
// type Query {
//      reviews: [Reviews] -> array of reviews returned and is the only entry point we are exposing. Users can use this to navigate to other resources if related.
// }
// review(id: ID!): Review -> saying here that this entry point returns a sigle review based on ID passed in by user and is required and is of type ID
// Mutation is another special type to make mutations
// Input isn't a type of data but instead a collection of fields

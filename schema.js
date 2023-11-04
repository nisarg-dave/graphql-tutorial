export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]! 
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }
    type Query {
        reviews: [Reviews]
        games:  [Game]
        authors: [Author]
    }
`;

// using a syntax highlighter hence #graphql
// int, float, string, boolean, ID - types available
// [String] -> array of strings
// ! means required, [String]! -> means that needs to be an array but strings need to be nullable
// Therefore, need like this [String!]! -> means that String inside are required
// Query type is a special type in graphql that is required and specifies the entry points to the graph and the return types of those entry points
// If we did this
// type Query {
//      reviews: [Reviews] -> array of reviews returned and is the only entry point we are exposing. Users can use this to navigate to other resources if related.
// }

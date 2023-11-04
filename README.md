## GraphQL Tutorial

- GraphQL is a Query Language and is an alternative to using REST API
- Uses HTTP under the hood
- With REST APIs we either overfetch (get too much data back) or underfetch (may need to send requests to multiple end points to get all data) when application scales
- GraphQL just had a single endpoint `/graphql` and query is sent to GraphQL endpoint in special syntax and it also allows for fetching nested related data in one query, Data is represented as a graph and query allows to traverse the graph.

### Query Basics

Example query here is called ReviewsQuery and is tapping into the reviews resource and is asking for only the ratings. This is how you make queries on the frontend

```
query ReviewsQuery {
    reviews {
        rating
    }
}
```

Response:

```
{
    "data": {
        "reviews": [
            {
                "rating": 9
            },
            {
                "rating": 10
            }
        ]
    }
}
```

Notice we are only getting data we need unlike REST

Now asking for content and ids as well

```
query ReviewsQuery {
    reviews {
        rating,
        content,
        id
    }
}
```

Now looking at nested related data. Game and author are related to reviews but separate resources.

```
query ReviewsQuery {
    reviews {
        rating,
        content,
        id,
        author {
            name,
            id,
            verified
        },
        games {
            title,
            platform
        }
    }
}
```

Response:

```
{
    "data": {
        "reviews": [
            {
                "rating": 9,
                "content": "lorem ipsum",
                "id": "1",
                "author": {
                    "name": "mario",
                    "id": "1",
                    "verified": true
                },
                "game": {
                    "title": "Final Fantasy 7 Remake",
                    "platform": {
                        "PS5",
                        "Xbox"
                    }
                }
            }
        ]
    }
}
```

#### Query Variables

When using Query Variables, $id is replaced by the id value in the json object below. Basically saying this query uses a parameter represented by $id of type ID which is required. Then calling resolver function and passing in same parameter.

```
query ReviewQuery($id: ID!) {
  review(id: $id) {
    rating,
    content
  }
}

{
  "id": "1"
}
```

Response:

```
{
  "data": {
    "review": {
      "rating": 9,
      "content": "lorem ipsum"
    }
  }
}
```

#### Mutations

Deleting

```
mutation DeleteMutation($id: ID!){
  deleteGame(id: $id) {
    id,
    title
    platform
  }
}

{
  "id": "2",
}
```

Response Type:

```
  "data": {
    "deleteGame": [
      {
        "id": "1",
        "title": "Zelda, Tears of the Kingdom",
        "platform": [
          "Switch"
        ]
      },
      {
        "id": "3",
        "title": "Elden Ring",
        "platform": [
          "PS5",
          "Xbox",
          "PC"
        ]
      },
    ]
  }
```

Adding

```
mutation AddMutation($game: AddGameInput!){
  addGame(game: $game) {
    id,
    title
    platform
  }
}

{
  "game": {
    "title": "a new game",
    "platform": ["switch", "ps5"]
  }
}
```

Response Type:

```
{
  "data": {
    "addGame": {
      "id": "6",
      "title": "a new game",
      "platform": [
        "switch",
        "ps5"
      ]
    }
  }
}
```

Update Mutation

```
mutation EditMutation($edits: EditGameInput!, $id: ID!){
  updateGame(edits: $edits, id: $id) {
    title,
    platform
  }
}

{
  "edits": {
    "title": "Spiderman 2",
  },
  "id": "1"
}
```

Response Type:

```
{
  "data": {
    "updateGame": {
      "title": "Spiderman 2",
      "platform": [
        "Switch"
      ]
    }
  }
}
```

## GraphQL Tutorial

- GraphQL is a Query Language and is an alternative to using REST API
- Uses HTTP under the hood
- With REST APIs we either overfetch (get too much data back) or underfetch (may need to send requests to multiple end points to get all data) when application scales
- GraphQL just had a single endpoint `/graphql` and query is sent to GraphQL endpoint in special syntax and it also allows for fetching nested related data in one query, Data is represented as a graph and query allows to traverse the graph.

### Query Basics

Example query here is called ReviewsQuery and is tapping into the reviews resource and is asking for only the ratings

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

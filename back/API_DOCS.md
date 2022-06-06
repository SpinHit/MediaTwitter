# joehilari-tweets API docs

The joehilari-tweets API has been created for education purpose. It is pulling Joe Biden and Elon Musk's timeline tweets.

---

# Setup and ports

Run `yarn install` to install all dependencies for twitterAPI.
Run `yarn start` to start the server.

The server runs on port 8000, so you can access the server at http://localhost:8000/

---

# Endpoint

- **getTweet** - Is used to access time-line tweet data from any public profile of twitter API.

---

## Users Endpoints

These endpoints control user-specific data.

1. Used to receive user specific data from twitter API. And tweet data is coming in this structure.

```json
[
  {
    "author_id": "1339835893",
    "id": "1411012578088730624",
    "text": "Get those shots, folks. https://t.co/hygbmxRnKT",
    "created_at": "2021-07-02T17:23:08.000Z"
  }
]
```

### GET `/api/tweet/musk`

Brought all tweet data from public profile time-line of Elon Musk using twitter API

### GET `/api/tweet/biden`

Brought all tweet data from public profile time-line of Joe-Biden using twitter API

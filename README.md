# Back-end

# Schemas

## Users:
* "id"
* "username"
* "email"
* "name"
* "password"

## Posts:
* "id"
* "title"
* "description"
* "date"
* "imgSrc"
* "user_id"

# API Requests

### GET
* /users
* /users/[id]
* /users/[post id]
* /posts
* /posts/[id]

### POST
* /auth/register
* /auth/login
* /[user_id]/posts

### PUT
* /[user_id]

### DELETE
* /[user_id]

source frigotest.sh

TEST "change-user-email"

CASE "success on correct user id"

curl -X PATCH 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/change-email' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNiMTFkMmE3ZjFjNDhlNTYwMmM3YTEiLCJpYXQiOjE3MjYzNDYyNjcsImV4cCI6MTcyNjM0OTg2N30.U4Sjo9T1y79hKBmK9yGWdvu7lIcsl9xfKJk_-_0i9HY' \
-H 'Content-Type: application/json' \
-d '{ "newEmail": "guestUser@email.com", "newEmailConfirm": "guestUser@email.com", "password": "password123" }' \
-v

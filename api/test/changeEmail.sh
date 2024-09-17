source frigotest.sh

TEST "change-user-email"

CASE "success on correct user id"

curl -X PATCH 'http://localhost:9000/users/66cb11d2a7f1c48e5602c7a1/change-email' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNiMTFkMmE3ZjFjNDhlNTYwMmM3YTEiLCJpYXQiOjE3MjYzODI2NjgsImV4cCI6MTcyNjM4NjI2OH0.E-BhMu5JnnW4JZws6HaogF3iCKIuUYMeRBAtCa8jaJQ' \
-H 'Content-Type: application/json' \
-d '{ "newEmail": "guestUser@email.com", "newEmailConfirm": "guestUser@email.com", "password": "password123" }' \
-v
